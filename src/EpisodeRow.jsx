import CountryBadge from './CountryBadge.jsx'

function escapeRegExp(term) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(text, term) {
  if (!term) return text
  const re = new RegExp(`(${escapeRegExp(term)})`, 'ig')
  const parts = text.split(re)
  return parts.map((part, i) =>
    re.test(part) ? <mark key={i}>{part}</mark> : part
  )
}

export default function EpisodeRow({ episode, searchTerm }) {
  return (
    <div className="ep">
      <div className="date">{episode.date}</div>
      <div className="body">
        <div className="title-row">
          <p className="title">{highlight(episode.title, searchTerm)}</p>
          {episode.source === 'ergaenzt' && <span className="tag-erg">ergänzt</span>}
          {episode.countries.map((c) => (
            <CountryBadge key={c} country={c} />
          ))}
          {episode.countries.length === 0 && (
            <span className="country-badge country-unk">nicht erkannt</span>
          )}
        </div>
        <p className="topic">{highlight(episode.main, searchTerm)}</p>
        {episode.zusatz && (
          <p className="topic">
            <span className="zusatz-label">Außerdem</span>
            {highlight(episode.zusatz, searchTerm)}
          </p>
        )}
        <div className="footer-row">
          {episode.duration && <span className="dur">{episode.duration}</span>}
          {episode.tags.map((tag) => (
            <span className="topic-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
