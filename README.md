# Servus. Grüezi. Hallo. — Themenarchiv

Durchsuchbares Archiv aller erfassten Podcast-Folgen mit Themen-Tags und
Länderkennzeichnung (Deutschland / Österreich / Schweiz). Gebaut mit React
und Vite, Daten liegen als externe JSON-Datei unter `src/data/episodes.json`.

## Lokal starten

```
npm install
npm run dev
```

## Build

```
npm run build
```

Das Ergebnis landet in `dist/`.

## Daten aktualisieren

`src/data/episodes.json` ist die einzige Datenquelle. Jeder Eintrag hat die
Form:

```json
{
  "date": "2026-08-26",
  "date_str": "26. August 2026",
  "title": "Erzähl das deinem Therapeuten",
  "main": "Hauptthema als Fließtext",
  "zusatz": "Zusatzthema, falls vorhanden, sonst leerer String",
  "duration": "1h 7min",
  "source": "original oder ergaenzt",
  "tags": ["Gesundheit", "Wirtschaft"],
  "countries": ["Deutschland", "Österreich", "Schweiz"]
}
```

`tags` und `countries` wurden automatisiert per Stichwortsuche aus Titel,
Haupt- und Zusatzthema erkannt — das ist eine Heuristik, keine manuell
geprüfte Klassifikation. Bei rund 30 Folgen konnte kein Land eindeutig
erkannt werden; diese führen `countries: []` und werden in der Oberfläche
als "nicht erkannt" angezeigt statt geraten.

Um die Erkennung zu verfeinern oder neue Folgen zu ergänzen, am einfachsten
in der Datenquelle mit demselben Python-Skript neu generieren und die Datei
ersetzen — es ist keine Datenbank, ein Rebuild und Redeploy genügt.

## Ordnerstruktur

```
src/
  App.jsx            Hauptkomponente: Suche, Filter, Liste
  EpisodeRow.jsx      Einzelne Folge inkl. Hervorhebung der Suchtreffer
  CountryBadge.jsx    Laender-Badge (DE / AT / CH)
  data/episodes.json  Datenquelle
  index.css           Globale Styles
```
