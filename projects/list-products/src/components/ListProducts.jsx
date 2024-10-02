import { useContext } from 'react'
import { CartContext } from '../context/cart'

const ListProducts = ({ products }) => {
  const { addToCart, cart, removeFromCart } = useContext(CartContext)

  const qtyProductAdd = (id) => {
    const product = cart.filter((p) => p.id == id)
    if (!product.length) return
    return product[0]
  }

  const productExistInCart = (product) => {
    return cart.some((item) => item.id === product.id)
  }

  return (
    <div className="mt-8 grid grid-cols-2 max-w-[900px] mx-auto gap-8">
      {products.map((product) => {
        const qtyProduct = qtyProductAdd(product.id)
        const existInCart = productExistInCart(product)
        return (
          <div
            key={product.title}
            className="flex items-center gap-4 bg-[#464646] relative"
          >
            <img
              src="https://fridays-back-dev.jnq.io/media/catalog/product/b/u/burger_tacos_web_1.png"
              alt={product.title}
              width={150}
              height={150}
              className="max-w-full block w-full h-full"
            />
            <aside className="flex flex-col gap-4 items-start justify-between pr-4 w-full pb-2 ">
              <p className=" w-full text-right text-xs">{product.category}</p>
              <p className="font-bold text-lg text-left">{product.title}</p>
              <span>S/ {product.price}</span>
              <button
                className="bg-[#FF6C37] rounded-md p-2 py-0"
                onClick={() =>
                  existInCart ? removeFromCart(product) : addToCart(product)
                }
              >
                {existInCart ? 'Remove from cart' : 'Add to cart'}
              </button>
              {qtyProduct && qtyProduct.id ? (
                <span className="absolute bottom-2 right-2">
                  Qty: {JSON.stringify(qtyProduct.quantity)}
                </span>
              ) : (
                ''
              )}
            </aside>
          </div>
        )
      })}
    </div>
  )
}

export default ListProducts
