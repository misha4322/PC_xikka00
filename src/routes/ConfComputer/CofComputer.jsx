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
  const [errorMessage, setErrorMessage] = useState(""); 

  const calculateTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, selectedItem) => {
      return total + (selectedItem?.price || 0);
    }, 0);
  };

  const filteredItems = (category) => {
    return componentsData[category];
  };

  const handleSelect = (category, item) => {
    dispatch(setSelectedComponents({
      ...selectedComponents,
      [category]: item,
    }));
  };

  const handleAddToBasket = () => {
    const allSelected = Object.keys(componentsData).every((category) => selectedComponents[category]);

    if (!allSelected) {
      setErrorMessage("Пожалуйста, выберите все компоненты."); 
      return;
    }

    const basketItems = JSON.parse(localStorage.getItem("basket")) || {};
    Object.entries(selectedComponents).forEach(([key, value]) => {
      basketItems[key] = value;
    });
    localStorage.setItem("basket", JSON.stringify(basketItems));
    navigate("/basket");
  };

  return (
    <div className={s.conf_div}>
      
      {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}

      {Object.entries(componentsData).map(([category, items]) => (
        <div key={category} className={s.proc}>
          <div className={s.div_konfi}>
            <img src={sectionIcons[category]} alt={category} />
            <h2>{categoryLabels[category] || category}</h2> 
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

      <div className={s.selectedComponents}>
        <h3>Выбранные комплектующие:</h3>
        {Object.entries(selectedComponents).map(([key, value]) => (
          <div key={key}>
            <span className={s.price2_2}>{categoryLabels[key] || key}: {value.name} - {value.price} ₽</span>
          </div>
        ))}
      </div>

      <div className={s.totalPrice}>
        <p className={s.price_itog}>Итоговая цена: {calculateTotalPrice()} р</p>
        <button className={s.basket} onClick={handleAddToBasket} disabled={!Object.keys(componentsData).every((category) => selectedComponents[category])}>
          <p className={s.basket_p}>В корзину</p>
        </button>
      </div>
    </div>
  );
};
