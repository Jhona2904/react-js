import { useEffect, useState } from 'react'
import { generateFact } from '../services/generateFact'

export function useGenerateFact({ counter }) {
  const [phrase, setPhrase] = useState()
  const refreshFact = () => {
    generateFact().then((newFact) => setPhrase(newFact))
  }

  useEffect(() => {
    refreshFact()
  }, [counter])

  return {
    phrase,
    refreshFact
  }
}
