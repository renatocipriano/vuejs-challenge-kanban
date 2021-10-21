<template>
<main class="content">

    <div class="container p-0">
        <ul>
          <li class="text-left">npm run serve (http://192.168.0.106:8080)</li>
          <li class="text-left">yarn dev (http://192.168.0.106:4000/api/)</li>
        </ul>


        <ul>
          <li v-for="column in columns" :key="column._id">
            {{column}}
          </li>
        </ul>
      
        <h1 class="h3 mb-3">Kanban Board</h1>

        <form @submit.prevent="storeColumn()">
          <div class="row">
            <div class="col-4">
              <input type="text" class="w-100 form-control" id="inputName" required placeholder="Name" v-model="column.name">
            </div>
            <div class="col-4">
              <input type="text" class="w-100 form-control" id="inputName" required placeholder="Description" v-model="column.description">
            </div>
            <div class="col-4">
              <button type="submit" class="w-100 btn btn-success mb-3">New Column</button>
            </div>
          </div>
        </form>

        <div class="row" id="kankan-columns">
            <kanban-column 
              @updateColumnChild="updateColumnChild"
              @deleteColumnChild="deleteColumnChild"
              v-for="column in columns" :key="column._id" :column="column"/>
        </div>
    </div>
</main>
</template>

<script>
import KanbanColumn from './components/KanbanColumn.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    "kanban-column": KanbanColumn
  },
  data() {
    return {
      urlApi: 'http://192.168.0.106:4000/api/columns',
      columns: [],
      column: {
        name: null,
        description: null,
        position: 0
      }
    }
  },
  beforeMount() {
    axios.get(this.urlApi)
        .then((response) => {
          this.columns = response.data;
        });
  },
  methods: {
    updateColumnChild(column) {
      var index = this.columns.findIndex(function(item){
          return item.id === column.id;
      })
      if (index !== -1) { this.columns[index] = column; }
    },
    deleteColumnChild(column) {
      var index = this.columns.findIndex(function(item){
          return item.id === column.id;
      })
      if (index !== -1) { this.columns.splice(index, 1); }
    },
    storeColumn() {
      axios.post(this.urlApi,this.column)
        .then((response) => {
          this.columns.push(response.data);
          this.column = {
            name: null,
            description: null,
            position: 0
          }
        });
    }
  }
}
</script>
