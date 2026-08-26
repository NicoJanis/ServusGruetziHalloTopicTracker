import { useMemo, useState } from 'react'
import episodes from './data/episodes.json'
import EpisodeRow from './EpisodeRow.jsx'

const ALL_TAGS = [...new Set(episodes.flatMap((e) => e.tags))].sort()
const ALL_COUNTRIES = ['Deutschland', 'Österreich', 'Schweiz']

export default function App() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const [activeCountry, setActiveCountry] = useState(null)

  const results = useMemo(() => {
    const term = search.trim().toLowerCase()
    return episodes.filter((ep) => {
      if (term) {
        const hay = `${ep.title} ${ep.main} ${ep.zusatz}`.toLowerCase()
        if (!hay.includes(term)) return false
      }
      if (activeTag && !ep.tags.includes(activeTag)) return false
      if (activeCountry && !ep.countries.includes(activeCountry)) return false
      return true
    })
  }, [search, activeTag, activeCountry])

  const hasFilters = search || activeTag || activeCountry

  function resetFilters() {
    setSearch('')
    setActiveTag(null)
    setActiveCountry(null)
  }

  return (
    <>
      <header>
        <p className="eyebrow">Themenarchiv</p>
        <h1>Servus. Grüezi. Hallo.</h1>
        <p className="sub">
          Durchsuchbare Übersicht aller erfassten Folgen mit Haupt- und
          Zusatzthema, Themen-Tags und Länderkennzeichnung.
        </p>
      </header>

      <svg className="ridge" viewBox="0 0 700 34" preserveAspectRatio="none">
        <path d="M0,30 L60,10 L110,24 L170,4 L230,26 L290,14 L350,28 L410,8 L470,22 L530,2 L590,20 L650,12 L700,26" />
        <circle cx="230" cy="26" r="2.4" />
        <circle cx="410" cy="8" r="2.4" />
        <circle cx="590" cy="20" r="2.4" />
      </svg>

      <div className="notice">
        <b>Zum Datenstand:</b> {episodes.length} Folgen (Februar 2018 bis
        August 2026). Länder- und Themen-Tags wurden automatisch aus den
        Beschreibungstexten erkannt (Stichwortsuche), nicht manuell geprüft, sondern automatisiert geparsed. Bei manchen Episoden ist "nicht erkannt" gekennzeichnet da die Tags durch ein Claude Sonet Model getagged wurden und nicht einzeln (nochmals) angehört. 
      </div>

      <div className="searchbar">
        <input
          type="text"
          placeholder="Thema suchen, z. B. Fußball, Wohnen, AfD, Bodensee …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filters">
        <div className="filter-row">
          <span className="label">Land</span>
          <div className="chip-group">
            {ALL_COUNTRIES.map((c) => (
              <button
                key={c}
                className={`chip chip-country ${
                  activeCountry === c ? `active-${c === 'Deutschland' ? 'de' : c === 'Österreich' ? 'at' : 'ch'}` : ''
                }`}
                onClick={() => setActiveCountry(activeCountry === c ? null : c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-row">
          <span className="label">Thema</span>
          <div className="chip-group">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                className={`chip ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="meta-row">
        <span>
          <b>{results.length}</b>{' '}
          {hasFilters ? `von ${episodes.length} Folgen` : 'Folgen'}
        </span>
        {hasFilters && (
          <button className="reset-link" onClick={resetFilters}>
            Filter zurücksetzen
          </button>
        )}
      </div>

      <div id="list">
        {results.length === 0 && (
          <div className="empty">Keine Folge zu diesen Kriterien gefunden.</div>
        )}
        {results.map((ep) => (
          <EpisodeRow key={`${ep.date}-${ep.title}`} episode={ep} searchTerm={search} />
        ))}
      </div>

      <footer className="site-footer">
        Servus. Grüezi. Hallo. Themenarchiv - inoffizielles Fanprojekt, Daten aus öffentlich zugänglichen Episodenbeschreibungen.
      </footer>
    </>
  )
}
