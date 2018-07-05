import fs from 'fs'

const jsFile = fs.readdirSync('./build/static/js')[0]
const cssFile = fs.readdirSync('./build/static/css')[0]

fs.readFile('./build/manifest.json', (err, data) => {
  const json = JSON.parse(data)
  json.content_scripts = [
    { matches: [ '<all_urls>' ],
    js: [ 'content.js', 'static/js/' + jsFile ],
    css: [ 'static/css/' + cssFile ] }
  ]
  fs.writeFile('./build/manifest.json', JSON.stringify(json), 'utf8', () => {})
})