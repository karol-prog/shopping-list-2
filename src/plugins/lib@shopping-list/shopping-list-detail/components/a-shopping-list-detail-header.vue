<template>
  <header>
    <h1>Shopping list 2</h1>
    <button @click="redirectToHome">Back</button>
  </header>
</template>

<script>
export default {
  methods: {
    //redirect back to main page from detail
    redirectToHome() {
      this.$router.push({ name: "Shopping List - List" });
    },
  },
};
</script>

<style scoped>
header {
  padding: 2rem;
  box-shadow: 0px 20px 10px -3px rgba(0, 0, 0, 0.1);
  background-color: #1e293b;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
