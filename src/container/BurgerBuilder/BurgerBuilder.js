//here we make main Buger Builder component, in which we can make burger
//<div>Burger Design like animation</div>
//<div>Build controls</div>

import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Auxi from "../../hoc/Auxi";

const INGREDIENT_PRICE = {
  salad: 10,
  cheese: 20,
  meat: 50,
  bacon: 20,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
  };

  //Handler for checking User add some ingredients or not?
  //For making order button enable/disable
  //so we need total of ingredients added if its >0 then enable other not
  updatePurchaseState(updatedIngredient) {
    const ingredients = {
      ...updatedIngredient,
    };

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]; //its return the value(cnt) salad :1 then it return 1 in place of salad
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0); //reduce method sums all got values(igKey) and gives direct sum

    this.setState({ purchasable: sum > 0 });
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  closeModel = () => {
    this.setState({ purchasing: false });
  };
  addIngredientHandler = (type) => {
    let oldCount = this.state.ingredients[type];
    let updatedCount = oldCount + 1;

    let updatedIngredient = {
      ...this.state.ingredients,
    };

    updatedIngredient[type] = updatedCount;
    let priceAddition = INGREDIENT_PRICE[type];
    let newPrice = this.state.totalPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updatedIngredient);
  };

  removeIngredientHandler = (type) => {
    let oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    let updatedCount = oldCount - 1;

    let updatedIngredient = {
      ...this.state.ingredients,
    };

    updatedIngredient[type] = updatedCount;
    let priceReduction = INGREDIENT_PRICE[type];
    let newPrice = this.state.totalPrice - priceReduction;

    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredient);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    //disabledInfo like eg { salad:true/false, bacon:true etc  }
    //so we know disable less button of that ingredient
    //otherwise if we do not add that ingredient and still try to remove it
    return (
      <Auxi>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchasingHandler}
        />
        <Modal show={this.state.purchasing} close={this.closeModel}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
      </Auxi>
    );
  }
}
