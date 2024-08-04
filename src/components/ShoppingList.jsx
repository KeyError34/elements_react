import React from "react";
function ShoppingList({arr, onEmpty,onAdd }) {
  React.useEffect(() => {
    if (arr.length === 0) {
        // console.log("boo")
      onEmpty("Shopping List is Empty");
      
    }
  }, []);
  if (arr.length === 0) {
    return null;
  }

  return (
    <>
      <ul>
        {arr.map((el, ind) => (
          <div key={ind}>
            <li>{el}</li>
            <button onClick={() => onAdd(el)}>Add to Order</button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default ShoppingList;

