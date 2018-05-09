////////////////
//            //
// INITIALIZE //
//            //
////////////////

var fs = require ('fs')

// my libraries
require ('green_curry') (['globalize', 'short F.c'])

// config
var cfg = {}//eval (fs.readFileSync ('config.jsx', 'utf8'))

/////////////
//         //
// FORKING //
//         //
/////////////
var cluster = require ('cluster')

F.log = x =>
  console.log (
    '(worker ' + (cluster.worker || {id: 'm'}).id + '): '
    + (typeof x == 'object' ? JSON.stringify (x) : x)
  )

if (cluster.isMaster) {
  F.times (require ('os').cpus ().length) (cluster.fork)

  cluster.on ('exit', p => {
    F.log ('Process ' + p.id + ' died')
    cfg.prod && cluster.fork ()
    cfg.prod && F.log ('New process started')
  })

  return
}

////////////////
//            //
// INITIALIZE //
//            //
////////////////

var http = require ('http')

var express = require ('express')
var app = express ()
var bodyParser = require ('body-parser')
app.use (bodyParser.urlencoded ({extended: false}))
app.use (bodyParser.json ())

var request = require ('request')

/////////////
//         //
// ROUTING //
//         //
/////////////

var get_header = x => ({
  'Content-Type': 'text/' + {
    css: 'css',
    html: 'html',
    js: 'javascript',
    plain: 'plain',
  } [x],
  'Expires': new Date ().toUTCString (),
  'Cache-Control': 'no-store',
})

var write = res => (...r) => {
  res.writeHead (r[0], get_header (r[1]))
  res.write (r[2])
  res.end ()
}

var rest = m => x => f => app[m] ('/' + x, f)

var get = rest ('get')

var post = rest ('post')

var put = rest ('put')

var del = rest ('delete')

var all = rest ('all')

//////////////
//          //
// SECURITY //
//          //
//////////////

var helmet = require ('helmet')
app.use (helmet ())

var sessions = require ('client-sessions')
app.use (sessions ({
  cookieName: 'authentication',
  secret: 'pinkpanther', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000,
  cookie: {
    path: '/',
    maxAge: 60 * 1000,
    ephemeral: false,
    httpOnly: true,
    // SSL only
    secure: false, // TODO: figure out what the documentation for client-sessions means
  },
}))

//////////////
//          //
// REST API //
//          //
//////////////

// require, wrap, and subscribe apis from ../serverless

//////////////////
//              //
// FILE SERVING //
//              //
//////////////////

var serve_static_file = web_path => file_path => type => {
  var file = fs.readFileSync (file_path)
  get (web_path) ((req, res) => write (res) (200, type, file))
}

A.iter (([web_path, file_path, type]) => serve_static_file (web_path) (file_path) (type)) ([
  ['bundle.js', 'build/bundle.js', 'js'],
  ['favicon.ico', 'build/favicon.ico', 'html'],
  ['', 'build/index.html', 'html'],
])

// var does_not_exist = (() => {
//   var file = fs.readFileSync ('frontend/html/404.html')
//   return (req, res) => {
//     log ('Attempted to access nonexistent resource ' + req.url)
//     write (res) (404, 'html', file)
//   }
// }) ()

// get ('*') (does_not_exist)

app.listen (cfg.port || 8080)
F.log ('Server is ready')
