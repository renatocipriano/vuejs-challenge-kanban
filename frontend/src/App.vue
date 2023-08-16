<template>
  <main class="content">
    <div class="container p-0">
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
