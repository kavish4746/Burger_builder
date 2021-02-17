import React from "react";
import Auxi from "../../../hoc/Auxi";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey} </span> :{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Auxi>
      <h3>Your Order Summary</h3>
      <p>Delicious Burger with follwing Ingredients</p>
      <ul>{ingredientsSummary}</ul>
    </Auxi>
  );
};

export default OrderSummary;
