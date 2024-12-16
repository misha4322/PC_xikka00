import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import componentsData from "../../componets/componentsData";
import s from "./Home.module.css";

export const Home = () => {
  const navigate = useNavigate();

  const builds = [
    {
      name: "Игровая сборка №1",
      config: {
        processor: componentsData.processor[3].name, // Intel Core i9
        video_card: componentsData.video_card[0].name, // RTX 4090
        memory: componentsData.memory[0].name, // Kingston Fury
        storage: componentsData.storage[0].name, // Samsung SSD
        case: componentsData.case[0].name, // NZXT H7 Elite
        power_supply: componentsData.power_supply[0].name, // Corsair RM1000x
        cooling: componentsData.cooling[0].name, // NZXT Kraken
        motherboard: componentsData.motherboard[2].name, // ASUS Z790
      },
    },
    {
      name: "Игровая сборка №2",
      config: {
        processor: componentsData.processor[0].name, // AMD Ryzen 9 9950Х
        video_card: componentsData.video_card[2].name, // RTX 4070
        memory: componentsData.memory[1].name, // TEAMGROUP T-Force
        storage: componentsData.storage[1].name, // Seagate HDD
        case: componentsData.case[1].name, // Corsair 5000D
        power_supply: componentsData.power_supply[1].name, // Seasonic TX-850
        cooling: componentsData.cooling[1].name, // Dark Rock Pro 4
        motherboard: componentsData.motherboard[0].name, // ASUS X670E
      },
    },
  ];

  const handleBuy = (config) => {
    const savedBasket = localStorage.getItem("basket");
    const basketItems = savedBasket ? JSON.parse(savedBasket) : {};

    Object.entries(config).forEach(([key, value]) => {
      basketItems[key] = value;
    });

    localStorage.setItem("basket", JSON.stringify(basketItems));
    navigate("/basket");
  };

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
          {builds.map((build, index) => (
            <SwiperSlide key={index} className={s.slide}>
              <div className={s.build}>
                <h2>{build.name}</h2>
                <div className={s.buttons}>
                  <button
                    onClick={() => handleBuy(build.config)}
                    className={s.buyButton}
                  >
                    Купить ПК
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={s.priceCategory}>
        <h2>Ценовая категория</h2>
        <div className={s.priceRange}>
          <div className={s.priceCategoryItem}>
            <h3>До 100к</h3>
            <p>=до 100 000 рублей.</p>
          
          </div>
          <div className={s.priceCategoryItem}>
            <h3>До 200к</h3>
            <p> до 200 000 рублей.</p>
           
          </div>
          <div className={s.priceCategoryItem}>
            <h3>От 300к</h3>
            <p>от 300 000 рублей.</p>
        
          </div>
        </div>
      </div>
    </div>
  );
};
