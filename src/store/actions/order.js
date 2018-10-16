import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }
};

export const purchaseBurgerFailure = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(
                response => {
                    console.log(response);
                    dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                }
            )
            .catch(
                error => {
                    dispatch(purchaseBurgerFailure(error));
                }
            );
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};