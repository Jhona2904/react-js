import { useReducer } from 'react'
import { initialState, reducer } from '../reducers/reducerCart'

export function useCartReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const addToCart = (product) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const removeFromCart = (product) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    })

  return { state, addToCart, clearCart, removeFromCart }
}
