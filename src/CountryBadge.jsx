const COUNTRY_CLASS = {
  Deutschland: 'country-de',
  Österreich: 'country-at',
  Schweiz: 'country-ch',
}

const COUNTRY_SHORT = {
  Deutschland: 'DE',
  Österreich: 'AT',
  Schweiz: 'CH',
}

export default function CountryBadge({ country }) {
  return (
    <span className={`country-badge ${COUNTRY_CLASS[country] || 'country-unk'}`}>
      {COUNTRY_SHORT[country] || country}
    </span>
  )
}
