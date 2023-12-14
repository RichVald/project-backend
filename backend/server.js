const express = require('express')
const dotenv = require('dotenv').config()
const port = 5000

const app = express()

app.get('/api/e-commerce', (req, res) => {
    res.send("obtener commerce")
})
app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`));