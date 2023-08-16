<template>
  <div class="card mb-3 bg-light" @dblclick="modeEditing">
    <div class="card-body p-3">
      <form action="" @submit.prevent="handleSubmit">
        <div class="row mb-2">
          <input
            type="hidden"
            class="custom-control-input"
            v-model="form.id_column"
          />

          <div class="col-6">
            <input
              type="checkbox"
              class="custom-control-input"
              :checked="form.checked"
              v-model="form.checked"
              :disabled="disabled()"
            />
          </div>
          <div class="col-6">
            <span style="margin-left: 10px">#{{ form.id }}</span>
          </div>
        </div>

        <input
          required
          class="w-100 mb-1"
          type="text"
          v-model="form.name"
          :disabled="disabled()"
        />
        <input
          required
          class="w-100 mb-1"
          type="text"
          v-model="form.description"
          :disabled="disabled()"
        />

        <div class="row mb-2 mt-2">
          <div class="col-12" style="text-align: right">
            <button
              type="submit"
              class="btn btn-primary btn-block"
              :disabled="disabled()"
            >
              Save
            </button>
            <span class="separator"></span>
            <a
              href="#"
              class="btn text-white btn-danger btn-block"
              @click.prevent="this.$store.commit('deleteCard', this.card);"
              >Delete</a
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: { type: Object },
    column: { type: Object, required: false },
    new: { type: Boolean, default: false },
  },
  data: () => {
    return {
      editing: false,
      creating: false,
      urlApi: null,
      form: {
        id: null,
        id_column: null,
        name: null,
        description: null,
        position: null,
        checked: false,
      },
    };
  },
  mounted() {
    this.setUp();
  },
  methods: {
    setUp() {
      this.editing = false;
      this.creating = false;
      if (typeof this.$props.card !== "undefined") {
        this.form = this.$props.card;
      }
      this.urlApi = `/cards/`;
      this.form.id_column = this.$parent.column.id;
    },
    handleSubmit() {
      this.new ? 
        this.$store.commit("storeCard", this.form) : 
        this.$store.commit("updateCard", this.form);
    },
    modeEditing() {
      this.editing = !this.editing;
    },
    disabled() {
      if (this.new || this.editing) {
        return false;
      }
      return true;
    },
  },
};
</script>