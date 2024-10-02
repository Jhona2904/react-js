import './App.css'
import Cart from './components/Cart'
import Header from './components/Header'
import ListProducts from './components/ListProducts'
import { CartProvider } from './context/cart'
import data from './data/products.json'
import { useFilters } from './hooks/useFilters'

function App() {
  const { filter, filterProducts } = useFilters()
  const products = filterProducts(data.products)

  return (
    <CartProvider>
      {JSON.stringify(filter)}
      <Cart />
      <Header />
      <ListProducts products={products} />
    </CartProvider>
  )
}

export default App
