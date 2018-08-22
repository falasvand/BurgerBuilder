import React from 'react';

import Auxx from '../../../hoc/Auxx';

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
            <p>Continue to Checkout?</p>
        </Auxx>
    );
};


export default orderSummary;