<template>
    <div class="col-12 col-lg-6 col-xl-3 mb-2 mt-2 kankan-column">
        <div class="card card-border-primary">
            <div class="card-header">
                <div class="card-actions float-right">
                    <form action="">
                        <div class="row mb-2">
                            <div class="col-4"><a href="#" class="btn text-white btn-secondary btn-block" @click.prevent="sortCards()">Sort</a></div>
                            <div class="col-4"><a href="#" class="btn text-white btn-primary btn-block" :class="disableButton()" @click.prevent="editing = true">Edit</a></div>
                            <div class="col-4"><a href="#" class="btn text-white btn-danger btn-block" :class="disableButton()" @click.prevent="deleteColumn()">Delete</a></div>
                        </div>
                        
                        <input class="w-100 mb-1" type="text" v-model="form.name" :disabled="!editing">
                        <input class="w-100 mb-1" type="text" v-model="form.description" :disabled="!editing">

                        <div class="row mb-2" v-if="editing">
                            <div class="col-6"><button type="submit" class="btn btn-success btn-block" @click.prevent="updateColumn()">Save</button></div>
                            <div class="col-6"><a href="#" class="btn text-white btn-secondary btn-block" @click.prevent="setUp()">Cancel</a></div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card-body p-3">

                <kanban-card v-for="card in column.cards" :key="card._id" :card="card"/>

                <a href="#" class="btn btn-success btn-block">Add new Card</a>
            </div>
        </div>
    </div>
</template>

<script>
import KanbanCard from './KanbanCard.vue';
import axios from 'axios';

export default {
    components: {
        'kanban-card': KanbanCard
    },
    props: ['column'],
    data: () => {
        return {
            editing: false,
            urlApi: null,
            form: {
                name: null,
                description: null,
                position: null,
            }
        }
    },
    mounted() {
        this.setUp();
    },
    methods: {
        setUp() {
            this.editing = false;
            this.form = {
                name : this.column.name,
                description : this.column.description,
                position : this.column.position,
            }
            this.urlApi = `http://192.168.0.106:4000/api/columns/${this.column.id}`;
        },
        disableButton() {
            return this.editing ? 'disabled' : '';
        },
        sortCards() {

        },
        deleteColumn() {
            axios.delete(this.urlApi)
                .then(() => {
                    this.$emit('deleteColumnChild', this.column);
                });
        },
        updateColumn() {
            axios.put(this.urlApi, this.form)
                .then((response) => {
                    this.editing = false;
                    this.$emit('updateColumnChild', response.data)
                });
        },
    }
}
</script>

<style>

</style>