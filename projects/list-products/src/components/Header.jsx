import { useState } from 'react'
import { useFilters } from '../hooks/useFilters'

const Header = () => {
  const [category, setCategory] = useState('all')
  const { setFilter, filter } = useFilters()

  const handleChange = (event) => {
    setFilter((prevState) => ({
      ...prevState,
      price: event.target.value
    }))
  }

  const handleSelectChange = (event) => {
    setCategory(event.target.value)
    setFilter((prevState) => ({
      ...prevState,
      category: event.target.value
    }))
  }
  return (
    <header className="max-w-[600px] mx-auto flex flex-col gap-8">
      <h1 className="text-3xl font-bold underline">
        Carrito de compras con REACT
      </h1>
      <section className="flex justify-between items-center">
        <div className="flex items-center justify-start gap-4">
          <label htmlFor="price-range">Precio a partir de:</label>
          <input
            type="range"
            name="price-range"
            id="price-range"
            min={0}
            max={1000}
            value={filter.price}
            onChange={handleChange}
          />
          <span>{filter.price}</span>
        </div>

        <div>
          <label htmlFor="category">Categoria:</label>
          <select
            name="category"
            id="category"
            onChange={handleSelectChange}
            value={category}
          >
            <option value="all">Todas</option>
            <option value="laptops">Portátiles</option>
            <option value="smartphones">Celulares</option>
          </select>
        </div>
      </section>
    </header>
  )
}

export default Header
