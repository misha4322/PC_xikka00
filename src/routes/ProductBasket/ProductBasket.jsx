import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./ProductBasket.module.css";
import trash from "../../assets/icons8-мусорка-100 1.svg";
import componentsData from "../../componets/componentsData";

export const ProductBasket = () => {
  const [basketItems, setBasketItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const calculateTotalPrice = (items) => {
    let total = 0;
    Object.entries(items).forEach(([category, itemName]) => {
      const component = componentsData[category]?.find((item) => item.name === itemName);
      if (component) total += component.price;
    });
    return total;
  };

  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      const items = JSON.parse(savedBasket);
      setBasketItems(items);
      setTotalPrice(calculateTotalPrice(items)); // Calculate price when items are loaded
    }
  }, []);

  const handleOrder = () => {
    if (phoneNumber && phoneNumber.length === 11) {
      setOrderSuccess(true);
      setBasketItems({});
      setTotalPrice(0);
      localStorage.removeItem("basket");
    } else {
      alert("Пожалуйста, введите корректный номер телефона (10 цифр).");
    }
  };

  const handleClearBasket = () => {
    setBasketItems({});
    setTotalPrice(0);
    localStorage.removeItem("basket");
  };

  const handleClose = () => {
    setOrderSuccess(false);
    navigate("/home"); 
  };

  const isBasketEmpty = Object.keys(basketItems).length === 0;

  const getCategoryName = (category) => {
    switch (category) {
      case "processor":
        return "Процессор";
      case "video_card":
        return "Видеокарта";
      case "memory":
        return "Оперативная память";
      case "case":
        return "Корпус";
      case "power_supply":
        return "Блок питания";
      case "cooling":
        return "Охлаждение";
      case "storage":
        return "Накопитель (SSD/HDD)";
      default:
        return category;
    }
  };

  return (
    <div className={s.basketContainer}>
      {!orderSuccess ? (
        <>
          <h2>Корзина</h2>
          {isBasketEmpty ? (
            <p>Корзина пуста</p>
          ) : (
            <ul>
              {Object.entries(basketItems).map(([category, itemName]) => {
                const component = componentsData[category]?.find((item) => item.name === itemName);
                return (
                  <li key={category}>
                    <strong>{getCategoryName(category)}:</strong> {itemName}
                    <span> - {component?.price} р</span>
                  </li>
                );
              })}
            </ul>
          )}
          <h3>Итоговая цена: {totalPrice} р</h3>

          <div className={s.inputContainer}>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Введите номер телефона"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              maxLength={11}
            />
            <button
              onClick={handleOrder}
              className={s.orderButton}
              disabled={isBasketEmpty || phoneNumber.length !== 11}
            >
              Заказать
            </button>
          </div>

          <button onClick={handleClearBasket} className={s.clearButton}>
            <img src={trash} alt="Очистить корзину" />
          </button>
        </>
      ) : (
        <div className={s.orderSuccess}>
          <h2>Спасибо за ваш заказ!</h2>
          <p>Ваш заказ успешно оформлен и передан на обработку.</p>
          <p>Номер телефона: {phoneNumber}</p>
          <p>Сумма заказа: {totalPrice} рублей</p>
          <button onClick={handleClose} className={s.closeButton}>
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};
