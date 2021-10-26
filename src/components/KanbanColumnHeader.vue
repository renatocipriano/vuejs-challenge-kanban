<template>
  <div class="card-header">
    <div class="card-actions float-right">
      <div class="row">
        <div class="col-10">
          <form action="">
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
                  @click.prevent="updateColumnSave()"
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
                      @click.prevent="deleteColumn()"
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
import axios from "axios";
export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      editing: false,
      form: Object,
    };
  },
  beforeMount() {
    this.form = this.column;
  },
  methods: {
    accepted() {
      this.$root.$emit('accepted')
      //this.$nuxt.$emit('accepted')
    },
    disableButton() {
      return this.editing ? "disabled" : "";
    },
    updateColumnSave() {
      axios.put(this.url, this.form).then((response) => {
        this.editing = false;
        this.$emit("updateColumnChild", response.data);
      });
    },
    deleteColumn() {
      axios.delete(this.url).then(() => {
        console.log('KanbanColumnHeader emitiu deleteColumn');
        this.$emit("deleteColumnChild", this.column);
      });
    },
  },
};
</script>

<style>
</style>