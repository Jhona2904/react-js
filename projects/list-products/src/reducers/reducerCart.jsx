export const initialState =
  JSON.parse(window.localStorage.getItem('itemsCart')) || []

const ACTIONS_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export const updateCartLocalStorage = (state) => {
  window.localStorage.setItem('itemsCart', JSON.stringify(state))
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTIONS_TYPES.ADD_TO_CART: {
      const { id } = payload
      const indexProduct = state.findIndex((item) => item.id === id)
      console.log(indexProduct)
      if (indexProduct >= 0) {
        const newCart = structuredClone(state)
        newCart[indexProduct].qty += 1
        updateCartLocalStorage(newCart)
        return newCart
      }

      const newState = [
        ...state,
        {
          ...payload,
          quantity: 1
        }
      ]
      updateCartLocalStorage(newState)
      return newState
    }

    case ACTIONS_TYPES.REMOVE_FROM_CART: {
      const { id } = payload
      const newState = state.filter((item) => item.id !== id)
      updateCartLocalStorage(newState)
      return newState
    }

    case ACTIONS_TYPES.CLEAR_CART: {
      updateCartLocalStorage(initialState)
      return initialState
    }
  }
}
