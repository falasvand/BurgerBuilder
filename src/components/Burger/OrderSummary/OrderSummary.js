import React, {Component} from 'react';

import Auxx from '../../../hoc/Auxx/Auxx';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be a functionaly component
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(
                ingKey => {
                    return (
                        <li key={ingKey}>
                            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
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
                <p>Total price: <strong>${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxx>
        );
    }
}

export default OrderSummary;