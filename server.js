const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, {encoding: 'utf-8'}, (error, result) => {
      if(error)
        reject(error)
      else
        resolve(result)
    })
  })
}

const hostname = '127.0.0.1'
const port = 3000
const router = {
  '/ GET': {
    asset: 'index.html',
    mime: mime.getType('html')
  },
  '/style.css GET': {
    asset: 'style.css',
    mime: mime.getType('css')
  },
  '/scripts.js GET': {
    asset: 'scripts.js',
    mime: 'text/javascript'
  }
}

// loging incoming request coming into the server
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  const key = router[`${route} ${method}`]
  if (!key) {
    res.writeHead(404)
    logRequest(method, route, 404)
    res.end()
    return
  }
  // console.log(key)
  res.writeHead(200, {'Content-Type': key.mime})
  res.write(await findAsset(key.asset))
  logRequest(method, route, 200)
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})


// ===========================
// var server = http.createServer(function (request, response) {
//   fs.readFile('./' + request.url, function(err, data) {
//       if (!err) {
//           var dotoffset = request.url.lastIndexOf('.');
//           var mimetype = dotoffset == -1
//                           ? 'text/plain'
//                           : {
//                               '.html' : 'text/html',
//                               '.ico' : 'image/x-icon',
//                               '.jpg' : 'image/jpeg',
//                               '.png' : 'image/png',
//                               '.gif' : 'image/gif',
//                               '.css' : 'text/css',
//                               '.js' : 'text/javascript'
//                               }[ request.url.substr(dotoffset) ];
//           response.setHeader('Content-type' , mimetype);
//           response.end(data);
//           console.log( request.url, mimetype );
//       } else {
//           console.log ('file not found: ' + request.url);
//           response.writeHead(404, "Not Found");
//           response.end();
//       }
//   });
// })                      