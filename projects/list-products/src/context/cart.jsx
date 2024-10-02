import { createContext } from 'react'
import { useCartReducer } from '../hooks/useCartReducer'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // const [cart, setCart] = useState([])

  // const addToCart = (product) => {
  //   const indexProduct = cart.findIndex((item) => item.id === product.id)
  //   console.log(indexProduct)
  //   if (indexProduct >= 0) {
  //     const newCart = structuredClone(cart)
  //     newCart[indexProduct].qty += 1
  //     setCart(newCart)
  //     return
  //   }

  //   setCart((prevState) => [
  //     ...prevState,
  //     {
  //       ...product,
  //       qty: 1
  //     }
  //   ])
  // }

  // const clearCart = () => {
  //   setCart([])
  // }

  // const removeFromCart = (productId) => {
  //   const newCart = cart.filter((item) => item.id !== productId)
  //   setCart(newCart)
  // }
  const { state, addToCart, clearCart, removeFromCart } = useCartReducer()
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        clearCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
