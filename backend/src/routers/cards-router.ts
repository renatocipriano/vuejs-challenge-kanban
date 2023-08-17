import express from 'express'
import Card from '../models/Card'
import cardsRepository from '../repositories/cards-repository'


const cardsRouter = express.Router()

cardsRouter.post('/cards', (req, res) => {
    const card: Card = req.body

    cardsRepository.criar(card, (id) => {
        if (id) {
            cardsRepository.ler(id, (card) => {
                if (card) {
                    res.json(card)
                } else {
                    res.status(404).send()
                }
            })
        } else {
            res.status(400).send()
        }
    })
})

cardsRouter.get('/cards', (req, res) => {
    cardsRepository.lerTodos((cards) => res.json(cards))
})

cardsRouter.get('/cards/:id', (req, res) => {
    const id: number = +req.params.id
    cardsRepository.ler(id, (card) => {
        if (card) {
            res.json(card)
        } else {
            res.status(404).send()
        }
    })
})

cardsRouter.put('/cards/:id', (req, res) => {
    const id: number = +req.params.id
    cardsRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            cardsRepository.ler(id, (card) => {
                if (card) {
                    res.json(card)
                } else {
                    res.status(404).send()
                }
            })
        }
    })
})

cardsRouter.delete('/cards/:id', (req, res) => {
    const id: number = +req.params.id
    cardsRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default cardsRouter