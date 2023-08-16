import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './css/app.css';
import axios from 'axios';

const BASE_API = 'http://192.168.0.106:4000/api/';
const URL_API_COLUMNS = `${BASE_API}columns/`;
const URL_API_COLUMN_CARDS = `${BASE_API}columns/:id_column/cards/`;
const URL_API_CARDS = `${BASE_API}cards/`


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
            setTimeout(function() {
                state.message = null;
            }, 3000)
        },

        // columns
        setColumns(state) {
            axios.get(URL_API_COLUMNS).then((response) => {
                state.columns = response.data;
                emitters.commit("setColumnCards");
            });
        },
        storeColumn(state, column) {
            axios.post(URL_API_COLUMNS, column)
                .then((response) => {
                    state.columns.push(response.data);
                    emitters.commit("updateNotification", "Coluna cadastrada com sucesso.");
                });
        },
        updateColumn(state, newColumn) {
            axios.put(`${URL_API_COLUMNS}${newColumn.id}`, newColumn).then((response) => {
                let updatedColumn = response.data,
                    index = state.columns.findIndex(function(item) {
                        return item.id === updatedColumn.id;
                    });
                if (index !== -1) {
                    state.columns[index] = updatedColumn;
                }
                emitters.commit("updateNotification", "Coluna atualizada com sucesso.");
            });
        },
        deleteColumn(state, column) {
            axios.delete(`${URL_API_COLUMNS}${column.id}`).then(() => {
                var index = state.columns.findIndex(function(item) {
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
                axios.get(url).then((response) => state.columns[index].cards = response.data);
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
            axios.post(URL_API_CARDS, card)
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
            console.log('updateCard')
            console.log(card)
                /*
                let url = this.urlApi + this.card.id;
                axios.put(url, this.form).then((response) => {
                    this.$emit("updateColumnCard", response.data);
                    this.editing = false;
                });
                */
        },
        deleteCard(state, card) {
            axios.delete(`${URL_API_CARDS}${card.id}`).then(() => {
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