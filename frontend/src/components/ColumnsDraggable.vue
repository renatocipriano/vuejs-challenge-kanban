<template>
  <div class="row flex-nowrap position-absolute" :style="height">
    <div class="col-2"><KanbanColumnForm /></div>

    <div :class="classColumn" v-for="column in columns" :key="column.id">
      <h3>
        <span class="d-inline-block">{{ column.name }}</span>
        <span class="d-inline-block px-2"
          ><i class="fa-solid fa-edit" @click="editColumn(column)"></i
        ></span>
        <span class="d-inline-block"
          ><i class="fa-solid fa-trash" @click="deleteColumn(column)"></i
        ></span>
      </h3>
      <h4><i class="fa-solid fa-add" @click="addCard(column)"></i></h4>
      <draggable
        class="list-group"
        :list="column.cards"
        group="cards"
        @change="log"
        itemKey="name"
        :ref="`column_${column.id}`"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <KanbanCard
              :key="element.id"
              :card="element"
              :column="column"
              :data-card-id="element.id"
              :class="`column_${column.id}_card`"
            />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import KanbanCard from "@/components/KanbanCard.vue";
import KanbanColumnForm from "@/components/KanbanColumnForm.vue";

export default {
  name: "ColumnsDraggable",
  props: {
    columns: {
      required: true,
    },
  },
  components: {
    draggable,
    KanbanCard,
    KanbanColumnForm,
  },
  data() {
    return {
      classColumn: "col-3 pt-2",
      columnEdit: null,
    };
  },
  methods: {
    log: function (evt) {
      if (evt.moved != undefined) {
        this.changeOrder(evt.moved.element.id_column);
      }
      if (evt.added != undefined) {
        this.changeCardColumn(evt.added.element);
      }
    },
    changeOrder(idColumn) {
      const nameColumn = "column_" + idColumn,
        cardElements = document.querySelectorAll(`.${nameColumn}_card`);

      if (cardElements.length > 0) {
        let ordem = [];
        cardElements.forEach((card) => {
          ordem.push(card.getAttribute("data-card-id"));
        });

        console.log("movido, enviar para o endpoint de atualização em massa");
        console.log(idColumn, ordem);
      }
    },
    changeCardColumn(card) {
      this.$store.commit("updateCard", card);
    },
    editColumn(column) {
      this.columnEdit = column;
      console.log(column);
    },
    deleteColumn(column) {
      console.log(column);
    },
    addCard(column) {
      console.log(column);
    },
  },
  computed: {
    height() {
      return "height: 100%;";
    },
  },
};
</script>