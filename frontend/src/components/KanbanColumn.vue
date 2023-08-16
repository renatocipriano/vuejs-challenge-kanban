<template>
  <div class="col-12 col-lg-6 col-xl-3 mb-2 mt-2 kankan-column">
    <div class="card card-border-primary">
      <div class="card-header">
        <div class="card-actions float-right">
          <div class="row">
            <kanban-column-header :column="column" />
          </div>
        </div>
      </div>
      <div class="card-body p-3">
        <kanban-card
          v-for="card in column.cards"
          :key="card.id"
          :card="card"
          :column="column"
        />

        <div class="row mb-2" v-if="creating">
          <kanban-card :new="creating"/>
        </div>
        <a
          href="#"
          class="btn btn-success btn-block"
          @click.prevent="addNewCard"
          >Add new Card</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from "./KanbanCard.vue";
import KanbanColumnHeader from "./KanbanColumnHeader.vue";

export default {
  components: {
    "kanban-card": KanbanCard,
    "kanban-column-header": KanbanColumnHeader,
  },
  props: ["column"],
  emits: ["accepted"],
  data: () => {
    return {
      creating: false,
      editing: false,
      sort: true,
      url: "",
      form: {
        name: null,
        description: null,
        position: null,
      },
    };
  },
  mounted() {
    /*
    this.setUp();
    let url = `${this.url}/cards`;
    axios.get(url).then((responseCard) => {
      this.cards = responseCard.data;
    });
    */
  },
  methods: {
    setUp() {

      this.creating = false;
      this.editing = false;
      this.form = {
        name: this.column.name,
        description: this.column.description,
        position: this.column.position,
      };
      //this.url = `/columns/${this.column.id}`;
    },
    addNewCard() {
      this.creating = true;
    },
    /*
    storeColumnCard(card) {
      this.creating = false;
      this.cards.push(card);
    },
    updateColumnCard(card) {
      this.editing = false;
      var index = this.cards.findIndex(function (item) {
        return item.id === card.id;
      });
      if (index !== -1) {
        this.cards[index] = card;
      }
    },
    deleteColumnCard(card) {
      var index = this.cards.findIndex(function (item) {
        return item.id === card.id;
      });

      if (index !== -1) {
        this.cards.splice(index, 1);
      }
    },*/
  },
};
</script>
<style scoped>
.card-header {
  background: gainsboro;
}
</style>