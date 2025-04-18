import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, price, image } = plant;
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  function handleClick() {
    setIsSoldOut((prev) => !prev);
  }

  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  function handlePriceSubmit() {
    const updatedPlant = { ...plant, price: parseFloat(newPrice) };
   
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((res) => res.json())
      .then((data) => {
        onUpdatePlant(data);
      });
    }

    function handleDelete() {
      fetch(`http://localhost:6001/plants/${id}`, {
        method: "DELETE",
      }).then(() => {
        onDeletePlant(id); 
      });
    }
   

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>
      <span>Price: {newPrice}</span> 
        <input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          step="0.01"
          style={{ marginLeft: "10px" }}
        />
      </p>
      <button onClick={handlePriceSubmit}>Update Price</button>
      <button onClick={handleDelete}>Delete</button> 
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
