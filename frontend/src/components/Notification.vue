<template>
  <div
    class="alert alert-success"
    role="alert"
    v-if="this.$store.state.message"
    v-text="this.$store.state.message"
  ></div>
</template>