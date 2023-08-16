<template>
  <form
    @submit.prevent="
      this.$store.commit('storeColumn', this.column);
      this.column = {};
    "
  >
    <div class="row">
      <div class="col-4">
        <input
          type="text"
          class="w-100 form-control"
          required
          placeholder="Name"
          v-model="column.name"
        />
      </div>
      <div class="col-4">
        <input
          type="text"
          class="w-100 form-control"
          required
          placeholder="Description"
          v-model="column.description"
        />
      </div>
      <div class="col-4">
        <button type="submit" class="w-100 btn btn-success mb-3">
          New Column
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      column: {},
    };
  },
};
</script>
