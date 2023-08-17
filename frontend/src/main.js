import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './css/app.css';
import axios from 'axios';

const URL_API_COLUMNS = `/columns/`;
const URL_API_COLUMN_CARDS = `/columns/:id_column/cards/`;
const URL_API_CARDS = `/cards/`

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

const emitters = createStore({
    state() {
        return {
            message: null,
            columns: [],
        }
    },
    mutations: {
        updateNotification(state, message) {
            state.message = message;
            setTimeout(function () {
                state.message = null;
            }, 3000)
        },

        // columns
        setColumns(state) {
            http.get(URL_API_COLUMNS).then((response) => {
                state.columns = response.data;
                emitters.commit("setColumnCards");
            });
        },
        storeColumn(state, column) {
            http.post(URL_API_COLUMNS, column)
                .then((response) => {
                    state.columns.push(response.data);
                    emitters.commit("updateNotification", "Coluna cadastrada com sucesso.");
                });
        },
        updateColumn(state, newColumn) {
            http.put(`${URL_API_COLUMNS}${newColumn.id}`, newColumn).then((response) => {
                let updatedColumn = response.data,
                    index = state.columns.findIndex(function (item) {
                        return item.id === updatedColumn.id;
                    });
                if (index !== -1) {
                    state.columns[index] = updatedColumn;
                }
                emitters.commit("updateNotification", "Coluna atualizada com sucesso.");
            });
        },
        deleteColumn(state, column) {
            http.delete(`${URL_API_COLUMNS}${column.id}`).then(() => {
                var index = state.columns.findIndex(function (item) {
                    return item.id === column.id;
                });
                if (index !== -1) {
                    state.columns.splice(index, 1);
                }
                emitters.commit("updateNotification", "Coluna deletada com sucesso.");
            });
        },
        // cards
        setColumnCards(state) {
            state.columns.forEach((column, index) => {
                let url = URL_API_COLUMN_CARDS.replace(':id_column', column.id);
                http.get(url).then((response) => state.columns[index].cards = response.data);
            });
        },
        sortColumnCards(state, params) {
            state.columns.forEach((column, index) => {
                if (column.id === params.id) {
                    if (params.sort) {
                        state.columns[index].cards.sort((a, b) => (a.position > b.position ? 1 : -1));
                    } else {
                        state.columns[index].cards.sort((a, b) => (a.position < b.position ? 1 : -1));
                    }
                }
            });
        },
        storeCard(state, card) {
            http.post(URL_API_CARDS, card)
                .then((response) => {
                    let stored = response.data

                    state.columns.forEach((column, index) => {
                        if (column.id === stored.id_column) {
                            state.columns[index].cards.push(stored);
                        }
                    });
                    emitters.commit("updateNotification", "Card cadastrado com sucesso.");
                });
        },
        updateCard(state, card) {
            http.put(URL_API_CARDS + card.id, card).then((response) => {
                let msg = response.status == 200 ? "Card atualizado com sucesso." : "Erro ao atualizar o card."
                emitters.commit("updateNotification", msg);
            });
        },
        deleteCard(state, card) {
            http.delete(`${URL_API_CARDS}${card.id}`).then(() => {
                state.columns.forEach((column, iColumn) => {
                    if (column.id === card.id_column) {
                        state.columns[iColumn].cards.forEach((toDelete, iCard) => {
                            if (toDelete.id === card.id) {
                                state.columns[iColumn].cards.splice(iCard, 1);
                                emitters.commit("updateNotification", "Card deletado com sucesso.");
                            }
                        });
                    }
                });
            });
        },
    }
})

createApp(App).use(emitters).mount('#app');