<template>
  <div>
    <h1 class="h3 my-3">{{ nameProject }}</h1><hr>
    <form @submit.prevent="store">
      <div class="row">
        <h3>Create new column</h3>
        <div class="col-12 mb-2">
          <input
            type="text"
            class="w-100 form-control"
            required
            placeholder="Name"
            v-model="column.name"
          />
        </div>
        <div class="col-12 mb-2">
          <input
            type="text"
            class="w-100 form-control"
            required
            placeholder="Description"
            v-model="column.description"
          />
        </div>
        <div class="col-12 mb-2">
          <button type="submit" class="w-100 btn btn-success mb-3">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      column: {},
      nameProject: process.env.VUE_APP_NAME,
    };
  },
  methods: {
    store() {
      this.$store.commit("storeColumn", this.column);
      this.column = {};
    },
  },
};
</script>
