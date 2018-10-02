import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.6,
    bacon: 0.9
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('https://react-burger-app-d2358.firebaseio.com/ingredients.json')
            .then(
                response => {
                    this.setState({ingredients: response.data});
                }
            )
            .catch(
                error => {
                    this.setState({error: true});
                }
            );
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(
                ingKey => {
                    return ingredients[ingKey];
                }
            )
            .reduce(
                (sum, element) => {
                    return sum + element;
                }
                , 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        );
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        );
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        // this.setState({
        //     loading: true
        // });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer : {
        //         name: 'Test User',
        //         address: {
        //             street: '111 Yonge St',
        //             zipCode: '12345',
        //             country: 'Canada'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json', order)
        //     .then(
        //         response => {
        //             this.setState({
        //                 loading: false,
        //                 purchasing: false
        //             });
        //         }
        //     )
        //     .catch(
        //         error => {
        //             this.setState({
        //                 loading: false,
        //                 purchasing: false
        //             });
        //         }
        //     );
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loadeded!</p> : <Spinner/>;
        if (this.state.ingredients) {
            burger = (
                <Auxx>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Auxx>
            );
            orderSummary = <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Auxx>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxx>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);