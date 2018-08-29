import React from 'react';

import Auxx from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(
            ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
                    </li>);
            }
        );

    return (
        <Auxx>
            <h3>Your Order</h3>
            <p>The following ingredients have been chosen:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxx>
    );
};


export default orderSummary;