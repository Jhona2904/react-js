import { useState } from 'react'
import { CardCat } from './components/CardCat'
import './App.css'
import { useGenerateFact } from './hooks/useGenerateFact'
import { useGenerateCat } from './hooks/useGenerateCat'

function App() {
  const [counter, setCounter] = useState(0)
  const [qty, setQty] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [messageError, setMessageError] = useState()

  const { phrase } = useGenerateFact({ counter })
  const { loading, arrCat, setWordSearched, wordSearched } = useGenerateCat({
    phrase,
    qty,
    submitted
  })

  const handleReset = () => {
    setWordSearched(null)
    setQty('')
    setCounter(counter + 1)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setWordSearched(null)
    const tamanioPhrase = phrase.split(' ')
    setMessageError()
    if (tamanioPhrase?.length && tamanioPhrase.length < qty) {
      setMessageError('Cantidad mayor al tamaño de la frase')
      return
    }
    setSubmitted(!submitted)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          placeItems: 'center',
          gap: '2rem',
          width: '30%',
          margin: '0 auto'
        }}
      >
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
            gap: '1rem'
          }}
        >
          <h2>Texto aleatorio generado:</h2>
          <div
            style={{
              fontSize: '1.3rem',
              fontStyle: 'italic',
              textAlign: 'left',
              fontFamily: 'system-ui',
              position: 'relative'
            }}
          >
            {phrase && <p>{phrase}</p>}

            {wordSearched && <p className="aer">{wordSearched}</p>}
          </div>
        </section>
        <form
          onSubmit={handleChange}
          style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
        >
          <input
            name="qty"
            type="number"
            placeholder="Cantidad de palabras a considerar..."
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          {messageError && <p className="message-error">{messageError}</p>}
          <button type="submit">Generar tarjeta</button>
        </form>
        <button className="button-reset" onClick={handleReset}>
          Generar nueva frase
        </button>
      </div>

      {loading && (
        <p
          style={{
            textAlign: 'center',
            width: '100%',
            fontFamily: 'system-ui',
            marginTop: '2rem'
          }}
        >
          Loading...
        </p>
      )}
      {arrCat.length > 0 && !loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
            gap: '2rem'
          }}
        >
          <h1 style={{ marginBottom: 0 }}>Lista de gatitos</h1>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '1rem'
            }}
          >
            {arrCat.map((cat) => (
              <CardCat cat={cat} key={cat.id} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default App
