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

  
  const buildsUnder100k = [
    {
      name: "До 100к",
      config: {
        processor: componentsData.processor[0].name, // Intel Core i3-13100
        video_card: componentsData.video_card[0].name, // GIGABYTE GeForce GTX 1660 SUPER
        memory: componentsData.memory[0].name, // 8GB HyperX Fury DDR4
        storage: componentsData.storage[0].name, // Seagate BarraCuda 2TB HDD
        case: componentsData.case[0].name, // Cooler Master MasterBox Q300L
        power_supply: componentsData.power_supply[0].name, // Cooler Master MWE Gold 650W
        cooling: componentsData.cooling[0].name, // be quiet! Pure Rock 2
        motherboard: componentsData.motherboard[0].name, // ASUS TUF Gaming B450-PLUS
      },
    },
  ];

  const buildsUnder200k = [
    {
      name: "до 200к",
      config: {
        processor: componentsData.processor[2].name, // Intel Core i5-13600K
        video_card: componentsData.video_card[4].name, // ZOTAC GeForce RTX 3060 Twin Edge OC
        memory: componentsData.memory[2].name, // 16GB Corsair Vengeance RGB Pro DDR4
        storage: componentsData.storage[2].name, // Western Digital Blue 500GB SSD
        case: componentsData.case[2].name, // NZXT H7 Elite
        power_supply: componentsData.power_supply[2].name, // Corsair RM750x
        cooling: componentsData.cooling[2].name, // Cooler Master Hyper 212 Black Edition
        motherboard: componentsData.motherboard[2].name, // Gigabyte Z490 AORUS Elite AC
      },
    },
  ];

  const buildsOver300k = [
    {
      name: "от 300к",
      config: {
        processor: componentsData.processor[6].name, // Intel Core i9-13900K
        video_card: componentsData.video_card[8].name, // MSI GeForce RTX 4090 SUPRIM
        memory: componentsData.memory[6].name, // 64GB Crucial Ballistix RGB DDR4
        storage: componentsData.storage[6].name, // Samsung 980 PRO 1TB NVMe SSD
        case: componentsData.case[5].name, // Corsair 5000D AIRFLOW
        power_supply: componentsData.power_supply[6].name, // Corsair RM1000x
        cooling: componentsData.cooling[6].name, // Noctua NH-D15
        motherboard: componentsData.motherboard[6].name, // MSI MAG Z690 TOMAHAWK
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

 
  const renderComponents = (config) => {
    return (
      <div className={s.componentsList}>
        <div className={s.componentItem}>
          <span>Процессор:</span> {config.processor}
        </div>
        <div className={s.componentItem}>
          <span>Видеокарта:</span> {config.video_card}
        </div>
        <div className={s.componentItem}>
          <span>Оперативная память:</span> {config.memory}
        </div>
        <div className={s.componentItem}>
          <span>Накопитель:</span> {config.storage}
        </div>
        <div className={s.componentItem}>
          <span>Корпус:</span> {config.case}
        </div>
        <div className={s.componentItem}>
          <span>Блок питания:</span> {config.power_supply}
        </div>
        <div className={s.componentItem}>
          <span>Охлаждение:</span> {config.cooling}
        </div>
        <div className={s.componentItem}>
          <span>Материнская плата:</span> {config.motherboard}
        </div>
      </div>
    );
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
            {buildsUnder100k.map((build, index) => (
              <div key={index} className={s.build}>
                <h4>{build.name}</h4>
                {renderComponents(build.config)}
                <button onClick={() => handleBuy(build.config)}>Купить ПК</button>
              </div>
            ))}
          </div>

          <div className={s.priceCategoryItem}>
            {buildsUnder200k.map((build, index) => (
              <div key={index} className={s.build}>
                <h4>{build.name}</h4>
                {renderComponents(build.config)}
                <button onClick={() => handleBuy(build.config)}>Купить ПК</button>
              </div>
            ))}
          </div>

          <div className={s.priceCategoryItem}>
            {buildsOver300k.map((build, index) => (
              <div key={index} className={s.build}>
                <h4>{build.name}</h4>
                {renderComponents(build.config)}
                <button onClick={() => handleBuy(build.config)}>Купить ПК</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
