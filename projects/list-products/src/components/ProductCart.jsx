import { useContext } from 'react'
import { CartContext } from '../context/cart'

const ProductCart = ({ product }) => {
  const { removeFromCart } = useContext(CartContext)
  return (
    <div className="flex gap-4 items-center justify-center">
      <img
        src="https://fridays-back-dev.jnq.io/media/catalog/product/b/u/burger_tacos_web_1.png"
        alt="Icon product"
        width={140}
        height={140}
        className="max-w-full rounded-2xl"
      />
      <aside className="flex flex-col gap-3">
        <p className="text-lg font-bold line-clamp-2">{product.title}</p>
        <p className="text-sm">Precio: S/ {product.price}</p>
        <button
          className="bg-[#FF6C37] rounded-md p-2 py-0"
          onClick={() => removeFromCart(product)}
        >
          Quitar del carrito
        </button>
      </aside>
    </div>
  )
}

export default ProductCart
