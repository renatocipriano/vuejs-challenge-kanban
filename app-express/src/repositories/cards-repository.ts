import Card from '../models/Card'
import database from './database'
const cardsRepository = {
    criar: (card: Card, callback: (id?: number) => void) => {

        const sql_max = '(select (ifnull(max("checked"), 0) + 1)  as "position"  from cards c)'
        const sql = `INSERT INTO cards (id_column, name, description, checked, position) VALUES (?, ?, ?, ?, ${sql_max})`

        const params = [
            card.id_column,
            card.name,
            card.description,
            card.checked
        ]

        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (cards: Card[]) => void) => {
        const sql = 'SELECT * FROM cards order by position asc'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (id: number, callback: (card?: Card) => void) => {
        const sql = 'SELECT * FROM cards WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row))
    },
    cardsColumn: (id: number, callback: (cards: Card[]) => void) => {
        const sql = 'SELECT * FROM cards WHERE id_column = ?'
        const params = [id]
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    atualizar: (id: number, card: Card, callback: (notFound: boolean) => void) => {

        const sql = 'UPDATE cards SET name = ?, description = ? , position = ? , checked = ? WHERE id = ?'
        const params = [
            card.name,
            card.description,
            card.position,
            card.checked,
            id
        ]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })

    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM cards WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default cardsRepository