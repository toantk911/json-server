// server.js
let jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')

//Middeware: convert post request to GET
server.use((req, res, next) => {
  // Converts POST to GET and move payload to query params
  // This way it will make JSON Server that it's GET request
  if (req.method != 'GET') {
      req.method = 'GET'

  }
  req.query = {}
  if (req.url.includes('?')) {
      res.redirect(req.url.replace(/\?.*$/, ''))
      return
  }
  next()
})

server.use(jsonServer.rewriter(require('./routes.json')))
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})