import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function useGenerateCat({ phrase, qty, submitted }) {
  const [wordSearched, setWordSearched] = useState()
  const [arrCat, setArrCat] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!phrase || !qty) return
    const qtyWords = phrase.split(' ', qty).join(' ')
    setWordSearched(qtyWords)
    setLoading(true)
    fetch(`https://cataas.com/cat/says/${qtyWords}?fontSize=50&fontColor=red`)
      .then((data) => {
        const objCat = {
          id: uuidv4(),
          text: qtyWords,
          text_search: phrase,
          image: data.url
        }
        setArrCat([...arrCat, objCat])
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [submitted])

  return {
    loading,
    arrCat,
    wordSearched,
    setWordSearched
  }
}
