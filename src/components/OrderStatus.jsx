function OrderStatus ({ orderId, status })  {
    return (
      <div>
        Order #{orderId}: {status}
      </div>
    );
  };
  
  export default OrderStatus;