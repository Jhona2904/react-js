const URL_API_FACT = 'https://catfact.ninja/fact'
export const generateFact = async () => {
  const res = await fetch(URL_API_FACT)
  const data = await res.json()
  const { fact } = data
  return fact
}
