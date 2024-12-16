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
  const [orderSuccessInfo, setOrderSuccessInfo] = useState({ phoneNumber: "", totalPrice: 0 }); // Состояние для информации о заказе
  const navigate = useNavigate();

  // Функция для вычисления итоговой цены
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
      setTotalPrice(calculateTotalPrice(items));
    }
  }, []);


  const handleOrder = () => {
    if (phoneNumber && phoneNumber.length === 11) {
   
      setOrderSuccessInfo({
        phoneNumber: phoneNumber,
        totalPrice: totalPrice,
      });

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
      case "motherboard":
          return "Материнская плата";
      default:
        return category;
    }
  };

  return (
    <div className={s.basketContainer}>
      <div className={s.contener21}>
        {!orderSuccess ? (
          <>
            <h2>Корзина</h2>
            {isBasketEmpty ? (
              <p>Корзина пуста</p>
            ) : (
              <ul className={s.spisok}>
                {Object.entries(basketItems).map(([category, itemName]) => {
                  const component = componentsData[category]?.find((item) => item.name === itemName);
                  return (
                    <li key={category} className={s.component}>
                      <strong>{getCategoryName(category)}:</strong> {itemName}
                      <span> - {component?.price} р</span>
                    </li>
                  );
                })}
              </ul>
            )}
            <h3 className={s.itogo}>Итоговая цена: {totalPrice} р</h3>

            <div className={s.inputContainer}>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Введите номер телефона"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} // Убираем все символы, кроме цифр
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
            <p>Номер телефона: {orderSuccessInfo.phoneNumber}</p>
            <p>Сумма заказа: {orderSuccessInfo.totalPrice} рублей</p>
            <button onClick={handleClose} className={s.closeButton}>
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
