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
  const [selectedComponents, setSelectedComponents] = useState(() => {
    try {
      const savedComponents = localStorage.getItem("selectedComponents");
      return savedComponents ? JSON.parse(savedComponents) : {};
    } catch (error) {
      console.error("Ошибка загрузки данных из localStorage", error);
      return {};
    }
  });

  const navigate = useNavigate();

  
  useEffect(() => {
    localStorage.setItem("selectedComponents", JSON.stringify(selectedComponents));
  }, [selectedComponents]);

  const handleSelect = (category, item) => {
    setSelectedComponents((prev) => {
      const newSelection = { ...prev, [category]: item.name };

      if (category === "processor") {
        newSelection.processorCompatibility = item.brand;
      }

      return newSelection;
    });
  };

  const handleAddToBasket = () => {
  
    const allSelected = Object.keys(componentsData).every((category) => {
      if (category === "motherboard") return true; 
      return selectedComponents[category];
    });

    if (!allSelected) {
      alert("Пожалуйста, выберите все компоненты.");
      return;
    }

   
    localStorage.setItem("basket", JSON.stringify(selectedComponents));
    localStorage.removeItem("selectedComponents"); 
    setSelectedComponents({}); 
    navigate("/basket");
  };

  const calculateTotalPrice = () => {
    return Object.entries(selectedComponents).reduce((total, [category, selectedItem]) => {
      const item = componentsData[category]?.find((component) => component.name === selectedItem);
      return total + (item?.price || 0);
    }, 0);
  };

  const filteredMotherboards = selectedComponents.processorCompatibility
    ? componentsData.motherboard.filter(
        (mboard) => mboard.compatibleWith === selectedComponents.processorCompatibility
      )
    : componentsData.motherboard;

  return (
    <div className={s.conf_div}>
      {Object.entries(componentsData).map(([category, items]) => {
        if (category === "motherboard") return null;

        return (
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
                  : category}
              </h2>
            </div>
            {items.map((item) => (
              <label key={item.name} className={s.itemLabel}>
                <input
                  type="radio"
                  name={category}
                  checked={selectedComponents[category] === item.name}
                  onChange={() => handleSelect(category, item)}
                />
                <span className={s.itemText}>{item.name}</span>
                <span className={s.price}>{item.price} р</span>
              </label>
            ))}
          </div>
        );
      })}

      {filteredMotherboards.length > 0 && (
        <div className={s.proc}>
          <div className={s.div_konfi}>
            <img src={sectionIcons["motherboard"]} alt="motherboard" />
            <h2>Материнская плата</h2>
          </div>
          {filteredMotherboards.map((item) => (
            <label key={item.name} className={s.itemLabel}>
              <input
                type="radio"
                name="motherboard"
                checked={selectedComponents.motherboard === item.name}
                onChange={() => handleSelect("motherboard", item)}
              />
              <span className={s.itemText}>{item.name}</span>
              <span className={s.price}>{item.price} р</span>
            </label>
          ))}
        </div>
      )}

      <div className={s.total}>
        <h3>Итого: {calculateTotalPrice()} р</h3>
        <button onClick={handleAddToBasket}>Добавить в корзину</button>
      </div>
    </div>
  );
};
