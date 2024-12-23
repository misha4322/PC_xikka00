// src/routes/home/home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import componentsData from "../../componets/componentsData";
import s from "./Home.module.css";
import { useDispatch } from "react-redux";
import { setSelectedComponents } from "../../features/componentsSlice"; 

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const builds = [
    {
      name: "Игровая сборка №1",
      config: {
        processor: componentsData.processor[3].name,
        video_card: componentsData.video_card[0].name,
        memory: componentsData.memory[0].name,
        storage: componentsData.storage[0].name,
        case: componentsData.case[0].name,
        power_supply: componentsData.power_supply[0].name,
        cooling: componentsData.cooling[0].name,
        motherboard: componentsData.motherboard[2].name,
      },
    },
    {
      name: "Игровая сборка №2",
      config: {
        processor: componentsData.processor[0].name,
        video_card: componentsData.video_card[2].name,
        memory: componentsData.memory[1].name,
        storage: componentsData.storage[1].name,
        case: componentsData.case[1].name,
        power_supply: componentsData.power_supply[1].name,
        cooling: componentsData.cooling[1].name,
        motherboard: componentsData.motherboard[0].name,
      },
    },
  ];

  const calculateTotalPrice = (config) => {
    return Object.entries(config).reduce((total, [key, value]) => {
      const component = componentsData[key]?.find(comp => comp.name === value);
      if (component) {
        total += component.price;
      }
      return total;
    }, 0);
  };
  const buildsByPrice = {
    under100k: [],
    under200k: [],
    over200k: [],
  };
  builds.forEach(build => {
    const totalPrice = calculateTotalPrice(build.config);
    if (totalPrice < 100000) {
      buildsByPrice.under100k.push(build);
    } else if (totalPrice < 200000) {
      buildsByPrice.under200k.push(build);
    } else {
      buildsByPrice.over200k.push(build);
    }
  });

  const handleBuy = (config) => {
    const savedBasket = localStorage.getItem("basket");
    const basketItems = savedBasket ? JSON.parse(savedBasket) : {};

    Object.entries(config).forEach(([key, value]) => {
      const component = componentsData[key]?.find(comp => comp.name === value);
      if (component) {
        basketItems[key] = { name: value, price: component.price };
      }
    });

    localStorage.setItem("basket", JSON.stringify(basketItems));
    navigate("/basket");
  };
  const handleEdit = (config) => {

    const selectedItems = Object.entries(config).reduce((acc, [key, name]) => {
      const component = componentsData[key]?.find(item => item.name === name);
      if (component) {
        acc[key] = component;
      }
      return acc;
    }, {});

    dispatch(setSelectedComponents(selectedItems)); 
    navigate("/gather"); 
  };

  const renderComponents = (config) => (
    <div className={s.componentsList}>
      {Object.entries(config).map(([key, value], index) => (
        <div key={index} className={s.componentItem}>
          <span>{key}:</span> {value}
        </div>
      ))}
    </div>
  );

  const renderBuildsByPrice = (builds) =>
    builds.map((build, index) => {
      const totalPrice = calculateTotalPrice(build.config); 
      return (
        <div key={index} className={s.build}>
          <h4>{build.name}</h4>
          {renderComponents(build.config)}
          <div className={s.totalPrice}>Итоговая стоимость: {totalPrice} ₽</div> 
          <button onClick={() => handleBuy(build.config)} className={s.buyButton}>
            Купить ПК
          </button>
          <button onClick={() => handleEdit(build.config)} className={s.editButton}>
            Изменить
          </button>
        </div>
      );
    });

    return (
      <div className={s.container}>
        <div className={s.sliderContainer}>
          <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            modules={[Navigation, Pagination, Autoplay]}
            className={s.swiper}
          >
            {builds.map((build, index) => {
              const totalPrice = calculateTotalPrice(build.config); 
              return (
                <SwiperSlide key={index} className={s.slide}>
                  <div className={s.build}>
                    <h2>{build.name}</h2>
                    {renderComponents(build.config)}
                    <div className={s.totalPrice}>{totalPrice} ₽</div>
                    <button onClick={() => handleBuy(build.config)} className={s.buyButton}>
                      Купить ПК
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
  
        <div className={s.priceCategory}>
          <h2>Ценовые категории</h2>
          <div className={s.priceRange}>
            <div className={s.priceCategoryItem}>
              {renderBuildsByPrice(buildsByPrice.under100k)}
            </div>
            <div className={s.priceCategoryItem}>
              {renderBuildsByPrice(buildsByPrice.under200k)}
            </div>
            <div className={s.priceCategoryItem}>
              {renderBuildsByPrice(buildsByPrice.over200k)}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Home;