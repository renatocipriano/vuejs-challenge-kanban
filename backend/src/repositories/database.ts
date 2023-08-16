import sqlite3 from 'sqlite3'
const DBSOURCE = 'database/db.sqlite'
const SQL_COLUMNS_CREATE = `
    CREATE TABLE columns (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        position INTEGER NOT NULL
    )`

const SQL_CARDS_CREATE = `
    CREATE TABLE cards (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        id_column INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        "position" INTEGER NOT NULL,
        checked INTEGER DEFAULT 0,
        CONSTRAINT cards_FK FOREIGN KEY (id_column) REFERENCES columns(id) ON DELETE CASCADE ON UPDATE CASCADE
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

        database.run(SQL_CARDS_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                console.log('Tabela cards criada com sucesso.')
            }
        })
    }
})
export default database