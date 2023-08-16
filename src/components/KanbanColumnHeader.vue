<template>
  <div class="card-header">
    <div class="card-actions float-right">
      <div class="row">
        <div class="col-10">
          <form @submit.prevent="updateEmit()">
            <input
              required
              class="w-100 mb-1"
              type="text"
              id="name"
              v-model="form.name"
              :disabled="!editing"
            />
            <input
              required
              class="w-100 mb-1 d-none"
              type="text"
              v-model="form.description"
              :disabled="!editing"
            />

            <div class="row mb-2" v-if="editing">
              <div class="col-sm-12" style="text-align: right">
                <button
                  type="submit"
                  class="btn btn-sm btn-success btn-inline mr-2"
                >
                  Save
                </button>
                <span class="separator"></span>
                <a
                  href="#"
                  class="btn btn-sm text-white btn-secondary btn-inline"
                  @click.prevent="setUp()"
                  >Cancel</a
                >
              </div>
            </div>
          </form>
        </div>
        <div class="col-2" style="padding: 0; margin: 0">
          <nav>
            <ul class="menu">
              <li>
                <span>...</span>
                <ul class="submenu">
                  <li>
                    <a
                      href="#"
                      class="btn btn-sm text-white btn-secondary btn-block"
                      @click.prevent="sortCards()"
                      >Sort</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="btn btn-sm text-white btn-primary btn-block"
                      :class="disableButton()"
                      @click.prevent="editing = true"
                      >Edit</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="btn btn-sm text-white btn-danger btn-block"
                      :class="disableButton()"
                      @click.prevent="deleteEmit()"
                      >Delete</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      editing: false,
      form: Object,
      sort: true,
    };
  },
  beforeMount() {
    this.form = this.column;
  },
  methods: {
    updateEmit() {
      this.$store.commit("updateColumn", this.form);
      this.editing = false;
    },
    deleteEmit() {
      this.$store.commit("deleteColumn", this.column);
    },
    disableButton() {
      return this.editing ? "disabled" : "";
    },
    sortCards() {
      this.$store.commit("sortColumnCards", {
        id: this.column.id,
        sort: this.sort,
      });
      this.sort = !this.sort;
    },
  },
};
</script>

<style>
</style>