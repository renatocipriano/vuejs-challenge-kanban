require('dotenv').config();
import express from 'express'
import cors from 'cors'
import columnsRouter from './routers/columns-router'
import cardsRouter from './routers/cards-router'


// App Express
const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoint raiz
app.get('/', (req, res) => {
    res.send({ status: 'up' })
})

// Cors
app.use(cors())

// Rotas
app.use('/', columnsRouter)
app.use('/', cardsRouter)


// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
    res.status(404)
})

// Inicia o sevidor
app.listen(process.env.API_PORT, () => {
    console.log(`Server running successfully ${process.env.API_URL}:${process.env.API_PORT}`)
})