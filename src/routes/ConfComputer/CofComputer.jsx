import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import componentsData from "../../componets/componentsData";
import s from "./ConfCompute.module.css";
import proc from "../../assets/proc.svg";
import vidokarta from "../../assets/Videokarta.svg";
import OZY from "../../assets/OZY.svg";
import matplata from "../../assets/matplata.svg";
import tower from "../../assets/tower.png";
import BP from "../../assets/BP.svg";
import hard from "../../assets/harddisk 1.svg";
import cooler from "../../assets/cooler 1.svg";

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

export const ConfComputer = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("selectedComponents");
    if (saved) setSelectedComponents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
  }, [selectedComponents]);

  const handleSelect = (category, item) => {
    setSelectedComponents((prev) => {
      const newSelection = { ...prev, [category]: { name: item.name, price: item.price } };

      if (category === "processor") {
        newSelection.processorCompatibility = item.socket;
      } else if (category === "motherboard") {
        newSelection.motherboardCompatibility = item.socket;
      }

      return newSelection;
    });
  };

  const handleAddToBasket = () => {
    const allSelected = Object.keys(componentsData).every((category) => selectedComponents[category]);

    if (!allSelected) {
      alert("Пожалуйста, выберите все компоненты.");
      return;
    }

    localStorage.setItem("basket", JSON.stringify(selectedComponents));
    navigate("/basket");
  };

  const calculateTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, selectedItem) => {
      return total + (selectedItem?.price || 0);
    }, 0);
  };

  const filteredItems = (category) => {
    if (category === "processor") {
      return selectedComponents.motherboardCompatibility
        ? componentsData.processor.filter(
            (processor) => processor.socket === selectedComponents.motherboardCompatibility
          )
        : componentsData.processor;
    } else if (category === "motherboard") {
      return selectedComponents.processorCompatibility
        ? componentsData.motherboard.filter(
            (motherboard) => motherboard.socket === selectedComponents.processorCompatibility
          )
        : componentsData.motherboard;
    }
    return componentsData[category];
  };

  return (
    <div className={s.conf_div}>
      {Object.entries(componentsData).map(([category, items]) => (
        <div key={category} className={s.proc}>
          <div className={s.div_konfi}>
            <img src={sectionIcons[category]} alt={category} />
            <h2>
              {category === "processor"
                ? "Процессор"
                : category === "video_card"
                ? "Видеокарта"
                : category === "memory"
                ? "Оперативная память"
                : category === "case"
                ? "Корпус"
                : category === "power_supply"
                ? "Блок питания"
                : category === "cooling"
                ? "Охлаждение"
                : category === "storage"
                ? "Накопитель (SSD/HDD)"
                : category === "motherboard"
                ? "Материнская плата"
                : category}
            </h2>
          </div>
          {filteredItems(category).map((item) => (
            <label key={item.name} className={s.itemLabel}>
              <input
                type="radio"
                name={category}
                checked={selectedComponents[category]?.name === item.name}
                onChange={() => handleSelect(category, item)}
              />
              <span className={s.itemText}>
                {item.name} — {item.price} р
              </span>
            </label>
          ))}
        </div>
      ))}

      <div className={s.totalPrice}>
        <p>Итоговая цена: {calculateTotalPrice()} р</p>
        <button className={s.basket} onClick={handleAddToBasket}>
          <p className={s.basket_p}>В корзину</p>
        </button>
      </div>
    </div>
  );
};