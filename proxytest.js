const express = require('express')
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// setup 
const PORT = process.env.PORT || 300
const HOST = "localhost"
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com"

// Logging 
app.use(morgan('dev'))

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
})

// Authorization 
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next()
    } else {
        res.sendStatus(403)
    }
})

// Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    }
}))

// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`)
})