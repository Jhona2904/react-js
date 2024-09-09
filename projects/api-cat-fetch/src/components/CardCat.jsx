import './CardCat.css'
export const CardCat = ({ cat }) => {
  return (
    <div className="card-cat">
      <aside>
        <p style={{ width: '100%', textAlign: 'justify', fontWeight: 'bold' }}>
          {cat.text}
        </p>
        <p style={{ fontStyle: 'italic', fontSize: '12px' }}>
          {cat.text_search}
        </p>
      </aside>
      <img
        src={cat.image}
        alt="test"
        width={300}
        height={300}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
