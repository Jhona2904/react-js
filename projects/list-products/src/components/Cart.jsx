import { useContext, useState } from 'react'
import { IconCart, IconClose } from './Icons'
import ProductCart from './ProductCart'
import { CartContext } from '../context/cart'

const Cart = () => {
  const [showCart, setShowCart] = useState(false)
  const { cart, clearCart } = useContext(CartContext)
  console.log(cart)
  return (
    <div className="relative">
      <button
        className="absolute top-0 right-0"
        onClick={() => setShowCart(true)}
      >
        <IconCart />
      </button>
      {showCart && (
        <section className="max-w-[400px] w-full h-full fixed right-0 top-0 bg-[#4b4949] z-[3] p-8 flex flex-col gap-8 justify-start">
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => setShowCart(false)}>
              <IconClose />
            </button>
            <p className="w-full text-center text-2xl font-bold">Tu carrito</p>
          </div>

          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto overflow-x-hidden">
            {cart.length === 0 ? (
              <p className="text-center text-lg">Tu carrito está vacío</p>
            ) : (
              cart.map((product, index) => (
                <ProductCart key={index} product={product} />
              ))
            )}
          </div>
          <div className="flex items-end w-full flex-1">
            <button
              className="bg-[#FF6C37] rounded-md w-full py-2"
              onClick={clearCart}
            >
              Limpiar carrito
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default Cart
