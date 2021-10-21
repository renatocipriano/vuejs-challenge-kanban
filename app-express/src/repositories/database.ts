import sqlite3 from 'sqlite3'
const DBSOURCE = 'db.sqlite'
const SQL_COLUMNS_CREATE = `
    CREATE TABLE columns (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        position INTEGER NOT NULL
    )`

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        database.run(SQL_COLUMNS_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                console.log('Tabela columns criada com sucesso.')
            }
        })
    }
})
export default database