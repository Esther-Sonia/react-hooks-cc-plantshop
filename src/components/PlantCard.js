import React, { useState } from "react";

function PlantCard({ plant }) {
  const { name, price, image } = plant;
  const [isSoldOut, setIsSoldOut] = useState(false);

  function handleClick() {
    setIsSoldOut((prev) => !prev);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isSoldOut ? (
        <button onClick={handleClick}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleClick}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
