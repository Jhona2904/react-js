import { useEffect, useRef, useState } from 'react'

export function useSearch() {
  const [wordSearch, setWordSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = wordSearch === ''
      return
    }
    if (wordSearch === '') {
      setError('Es un campo requerido')
      return
    }
    if (wordSearch.length < 3) {
      setError('Debe escribir más de 3 letras')
      return
    }
    setError(null)
  }, [wordSearch])
  return { wordSearch, setWordSearch, error }
}
