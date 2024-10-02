import { useContext } from 'react'
import { FilterContext } from '../context/filters'

export function useFilters() {
  const { filter, setFilter } = useContext(FilterContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filter.price &&
        (filter.category === 'all' || filter.category === product.category)
      )
    })
  }

  return { filter, setFilter, filterProducts }
}
