import React, { useState, useCallback } from "react";
import "./App.css";
import CustomAlert from "./components/CustomAlert";
import Greeting from "./components/Greeting";
import ShoppingList from "./components/ShoppingList";
import OrderStatus from './components/OrderStatus'; 
function App() {
  //состояния для имени, сообщения алерта и видимости алерта
  const [name, setName] = useState(""); // `name` - текущее значение в поле ввода. `setName` - функция для его обновления.
  const [alertMessage, setAlertMessage] = useState(""); // `alertMessage` - сообщение для алерта. `setAlertMessage` - функция для его обновления.
  const [showAlert, setShowAlert] = useState(false); // `showAlert` - состояние, показывать ли алерт. `setShowAlert` - функция для его обновления.
  const [orderItems, setOrderItems] = useState([]); // Массив для хранения выбранных продуктов
  const products = ["apple", "banna", "kiwi"];//"apple", "banna", "kiwi"
  const orders = [
    { orderId: 123, status: 'в пути' },
    { orderId: 124, status: 'доставлен' },
    { orderId: 125, status: 'обработан' },
  ];
  // обработкa изменений в поле ввода
  const handleInput = (ev) => {
    setName(ev.target.value); //  `name` с новым значением из поля ввода
  };

  // обработкa нажатия клавиш в поле ввода
  const handleKeyPress = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      setShowAlert(true);
      setName("");
    }
  };

  // установкa сообщения алерта
  const handleGreet = useCallback((message) => {
    setAlertMessage(message); // устанавливаем сообщение для алерта
  }, []); // `useCallback` запоминает функцию, чтобы не создавать её заново при каждом рендере

  // установка и отображение алерта
  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  // закрытие алерта
  const handleCloseAlert = () => {
    // console.log("closed")
    setShowAlert(false); // скрываем алерт
  };
  const handleAddToOrder = (product) => {
    setOrderItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.name === product);
      if (itemIndex > -1) {
        // если продукт уже есть увеличиваем его количество
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        // если продукта нет в заказе добавляем его с количеством 1
        return [...prevItems, { name: product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromOrder = (product) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((item) =>
          item.name === product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  return (
    <div className="App">
      <h1>Enter your name</h1>
      <input
        type="text"
        value={name} // значение соответствует состоянию `name`
        onChange={handleInput} // при изменении значения инпута функция `handleInput`
        onKeyDown={handleKeyPress} // при нажатии ` Enter ` вызывается функция `handleKeyPress`
        placeholder="your name"
      />
      {showAlert && ( // если `showAlert` истинно, показываем  `CustomAlert`
        <CustomAlert
          message={alertMessage} // сообщение для алерта
          onClose={handleCloseAlert} //  функция для закрытия алерта
        />
      )}
      <Greeting name={name} onGreet={handleGreet} />
      {/* передаем текущее имя и функцию для установки приветствия в компонент `Greeting` */}
      <ShoppingList arr={products} onEmpty={handleShowAlert} onAdd={handleAddToOrder} />
      <h2>Order Summary</h2>
      <ul>
        {orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <li key={index}>
              {item.name} (*{item.quantity})
              <button onClick={() => handleRemoveFromOrder(item.name)}>
                Remove
              </button>
            </li>
          ))
        ) : (
          <li>No items in the order</li>
        )}
      </ul>
      <h2>Order Status</h2>
      {orders.map((order) => (
        <OrderStatus
          key={order.orderId}
          orderId={order.orderId}
          status={order.status}
        />
      ))}
      
    </div>
  );
}

export default App;


