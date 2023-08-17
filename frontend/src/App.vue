<template>
  <main class="content px-5">
    <notification />
    <columns-draggable :columns="columns" />
  </main>
</template>

<script>
import Notification from "./components/Notification.vue";
import ColumnsDraggable from "@/components/ColumnsDraggable.vue";

export default {
  name: "App",
  title: process.env.VUE_APP_NAME,
  components: {
    notification: Notification,
    "columns-draggable": ColumnsDraggable,
  },
  data() {
    return {
    };
  },
  beforeMount() {
    this.$store.commit("setColumns");
  },
  computed: {
    columns() {
      return this.$store.state.columns;
    },
  },
};
</script>
