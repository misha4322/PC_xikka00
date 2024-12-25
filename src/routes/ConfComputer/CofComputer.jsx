import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import componentsData from "../../componets/componentsData";
import s from "./ConfCompute.module.css";
import proc from "../../assets/proc.svg";
import vidokarta from "../../assets/Videokarta.svg";
import OZY from "../../assets/OZY.svg";
import matplata from "../../assets/matplata.svg";
import tower from "../../assets/tower.svg";
import BP from "../../assets/BP.svg";
import hard from "../../assets/harddisk 1.svg";
import cooler from "../../assets/cooler 1.svg";
import { setSelectedComponents } from "../../features/componentsSlice";

// Иконки для разных категорий
const sectionIcons = {
  processor: proc,
  video_card: vidokarta,
  memory: OZY,
  case: tower,
  power_supply: BP,
  cooling: cooler,
  storage: hard,
  motherboard: matplata,
};

// Названия категорий
const categoryLabels = {
  processor: "Процессор",
  video_card: "Видеокарта",
  memory: "Оперативная память",
  case: "Корпус",
  power_supply: "Блок питания",
  cooling: "Охлаждение",
  storage: "Жесткий диск",
  motherboard: "Материнская плата",
};

export const ConfComputer = () => {
  const dispatch = useDispatch();
  const selectedComponents = useSelector((state) => state.components.selectedComponents);
  const navigate = useNavigate();

  // Проверка, выбраны ли все компоненты
  const isConfigurationComplete = () => {
    return Object.keys(componentsData).every(
      (category) => selectedComponents[category] && selectedComponents[category].name
    );
  };

  // Функция для обработки выбора компонента
  const handleSelect = (category, item) => {
    dispatch(
      setSelectedComponents({
        ...selectedComponents,
        [category]: item,
      })
    );
  };

  // Функция для фильтрации материнских плат по сокету
  const filterMotherboards = (motherboards, processor) => {
    if (!processor || !processor.socket) return motherboards;
    return motherboards.filter((mb) => mb.socket === processor.socket);
  };

  // Функция для проверки конфигурации перед добавлением в корзину
  const handleAddToBasket = () => {
    if (isConfigurationComplete()) {
      // Сохранение выбранных комплектующих в корзину
      const basketItems = JSON.parse(localStorage.getItem("basket")) || {};
      Object.entries(selectedComponents).forEach(([key, value]) => {
        basketItems[key] = value;
      });
      localStorage.setItem("basket", JSON.stringify(basketItems));

      // Переход на страницу корзины
      navigate("/basket");
    } else {
      // Если не все компоненты выбраны, показываем alert
      alert("Пожалуйста, выберите все комплектующие для завершения сборки!");
    }
  };

  // Функция для вычисления итоговой цены
  const calculateTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, selectedItem) => {
      return total + (selectedItem?.price || 0);
    }, 0);
  };

  return (
    <div className={s.conf_div}>
      {Object.entries(componentsData).map(([category, items]) => {
        // Фильтрация материнских плат по сокету процессора
        const filteredItems =
          category === "motherboard"
            ? filterMotherboards(items, selectedComponents.processor)
            : items;

        return (
          <div key={category} className={s.proc}>
            <div className={s.div_konfi}>
              <img src={sectionIcons[category]} alt={category} />
              <h2>{categoryLabels[category] || category}</h2>
            </div>
            {filteredItems.map((item) => (
              <label key={item.name} className={s.itemLabel}>
                <div className={s.div_konfigurati}>
                  <input
                    type="radio"
                    name={category}
                    checked={selectedComponents[category]?.name === item.name}
                    onChange={() => handleSelect(category, item)}
                  />
                  <span className={s.itemText}>
                    {item.name}
                  </span>
                </div>
                <span className={s.price_konf}>
                  {item.price} р
                </span>
              </label>
            ))}
          </div>
        );
      })}

      <div className={s.selectedComponents}>
        <h3 className={s.h3_set}>Выбранные комплектующие:</h3>
        {Object.entries(selectedComponents).map(([key, value]) => (
          <div key={key}>
            <span className={s.price2_2}>
              {categoryLabels[key] || key}: {value.name} - {value.price} ₽
            </span>
          </div>
        ))}
      </div>

      <div className={s.totalPrice}>
        <p className={s.price_itog}>Итоговая цена: {calculateTotalPrice()} р</p>
        <button
          className={s.basket}
          onClick={handleAddToBasket}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};
