import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import s from "./ProductBasket.module.css";
import trash from "../../assets/icons8-мусорка-100 1.svg";
import fractal from "../../assets/Fractal-Design.png"
import componentsData from "../../componets/componentsData";
import { nanoid } from "@reduxjs/toolkit";
import { IMaskInput } from 'react-imask';

export const ProductBasket = () => {
  const [basketItems, setBasketItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderSuccessInfo, setOrderSuccessInfo] = useState({ phoneNumber: "", totalPrice: 0 });
  const navigate = useNavigate();

  const calculateTotalPrice = (items) => {
    let total = 0;
    Object.entries(items).forEach(([category, item]) => {
      const component = componentsData[category]?.find((comp) => comp.name === item.name);
      if (component) total += component.price;
    });
    return total;
  };

  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      const items = JSON.parse(savedBasket);
      setBasketItems(items);
      setTotalPrice(calculateTotalPrice(items));
    }
  }, []);

  const handleOrder = () => {
    if (phoneNumber && phoneNumber.length === 11) {
      setOrderSuccessInfo({ phoneNumber, totalPrice });
      setOrderSuccess(true);
      setBasketItems({});
      setTotalPrice(0);
      localStorage.removeItem("/Final");
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
    navigate("/");
  };

  const ref = useRef(null);
  const inputRef = useRef(null);


  const isBasketEmpty = Object.keys(basketItems).length === 0;

  const getCategoryName = (category) => {
    switch (category) {
      case "processor": return "Процессор";
      case "video_card": return "Видеокарта";
      case "memory": return "Оперативная память";
      case "case": return "Корпус";
      case "power_supply": return "Блок питания";
      case "cooling": return "Охлаждение";
      case "storage": return "Накопитель (SSD/HDD)";
      case "motherboard": return "Материнская плата";
      default: return category;
    }
  };

  return (
    <div className={s.basketContainer}>

      {!orderSuccess ? (
        <>

          <div className={s.div_basket}>
            {isBasketEmpty ? (
              <p className={s.trash_zero}>Корзина пуста</p>
            ) : (
              <ul className={s.spisok}>
                {Object.entries(basketItems).map(([category, item]) => {
                  const component = componentsData[category]?.find((comp) => comp.name === item.name);
                  return (
                    <li key={category} className={s.component}>
                      <strong>{getCategoryName(category)}:</strong> {item.name}

                    </li>
                  );
                })}
              </ul>
            )}
            <div className={s.tovar}>
              <img src={fractal} alt="" />
              <h3 className={s.itogo}>Итог :{totalPrice} р</h3>

              <div className={s.inputContainer}>
 
                <IMaskInput
                  className={s.inputTel}
                  id="phone-mask"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Введите номер телефона"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  maxLength={18}
                  pattern="[0-9]*"
                  mask={'+{7} (000) 000-00-00'}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <div className={s.btnDelY}>
                  <button
                    onClick={handleOrder}
                    className={s.orderButton}
                    disabled={isBasketEmpty || phoneNumber.length !== 11}
                  >
                    Заказать
                  </button>
                  <button onClick={handleClearBasket} className={s.clearButton}>
                    <img src={trash} alt="Очистить корзину" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </>
      ) : (
        <div className={s.orderSuccess}>
          <div className={s.f}>
            <h2>Спасибо за ваш заказ!</h2>
            <p>Мы благодарим вас за покупку в нашем интернет-магазине! Ваш заказ успешно оформлен, и мы рады сообщить, что он уже в обработке.</p>

            <p>Мы позвоним по этому номеру для потверждение заказа: {orderSuccessInfo.phoneNumber}</p>
            <p>Номер вашего заказа: {nanoid(6)} <br />Сумма заказа: {orderSuccessInfo.totalPrice} рублей </p>

            <p>Если у вас возникнут вопросы или потребуется помощь, не стесняйтесь обращаться в нашу службу поддержки:</p>
            <p>Телефон: +7 (123) 456-78-90 <br /> Электронная почта: support@example.com</p>

            <button onClick={handleClose} className={s.closeButton}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>

  );
};
