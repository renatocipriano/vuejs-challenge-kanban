import express from 'express'
import Column from '../models/Column'
import columnsRepository from '../repositories/columns-repository'


const columnsRouter = express.Router()

columnsRouter.post('/columns', (req, res) => {
    const column: Column = req.body

    columnsRepository.criar(column, (id) => {
        if (id) {
            columnsRepository.ler(id, (column) => {
                if (column) {
                    res.json(column)
                } else {
                    res.status(404).send()
                }
            })
        } else {
            res.status(400).send()
        }
    })
})

columnsRouter.get('/columns', (req, res) => {
    columnsRepository.lerTodos((columns) => res.json(columns))
})

columnsRouter.get('/columns/:id', (req, res) => {
    const id: number = +req.params.id
    columnsRepository.ler(id, (column) => {
        if (column) {
            res.json(column)
        } else {
            res.status(404).send()
        }
    })
})

columnsRouter.put('/columns/:id', (req, res) => {
    const id: number = +req.params.id
    columnsRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            columnsRepository.ler(id, (column) => {
                if (column) {
                    res.json(column)
                } else {
                    res.status(404).send()
                }
            })
        }
    })
})

columnsRouter.delete('/columns/:id', (req, res) => {
    const id: number = +req.params.id
    columnsRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default columnsRouter