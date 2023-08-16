<template>
  <main class="content">
    <div class="container p-0">
      <ul style="display: none">
        <li class="text-left">
          cd /home/ist-sd/dev/study/vuejs-challenge-kanban/app-express && yarn
          dev (http://192.168.0.106:4000/api/)
        </li>
        <li class="text-left">
          cd /home/ist-sd/dev/study/vuejs-challenge-kanban/ && npm run serve
          (http://192.168.0.106:8080)
        </li>
      </ul>

      <h1 class="h3 mb-3">Kanban Board</h1>

      <notification />
      <kanban-column-form />

      <div class="row" id="kankan-columns" v-if="getColumns()">
        <kanban-column
          v-for="column in getColumns()"
          :key="columnKey(column)"
          :column="column"
        />
      </div>
    </div>
  </main>
</template>

<script>
import KanbanColumn from "./components/KanbanColumn.vue";
import KanbanColumnForm from "./components/KanbanColumnForm.vue";
import Notification from "./components/Notification.vue";

export default {
  name: "App",
  components: {
    "kanban-column": KanbanColumn,
    "kanban-column-form": KanbanColumnForm,
    "notification": Notification,
  },
  beforeMount() {
    this.$store.commit("setColumns");
  },
  methods: {
    getColumns() {
      return this.$store.state.columns
    },
    columnKey(column) {
      return new URLSearchParams(column).toString();
    }
  },
};
</script>
