import Column from '../models/Column'
import database from './database'
const columnsRepository = {
    criar: (column: Column, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO columns (name, description, position) VALUES (?, ?, (select max("position") + 1 as "position" from columns c))'

        const params = [
            column.name,
            column.description
        ]

        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (columns: Column[]) => void) => {
        const sql = 'SELECT * FROM columns order by position asc'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (id: number, callback: (column?: Column) => void) => {
        const sql = 'SELECT * FROM columns WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row))
    },
    atualizar: (id: number, column: Column, callback: (notFound: boolean) => void) => {

        const sql = 'UPDATE columns SET name = ?, description = ? , position = ? WHERE id = ?'
        const params = [
            column.name,
            column.description,
            column.position,
            id
        ]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })

    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM columns WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default columnsRepository