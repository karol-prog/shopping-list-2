<template>
  <aShoppingListsHeader />

  <div class="container-content">
    <aShoppingListsContent />
  </div>
</template>

<script>
/* components */
import aShoppingListsHeader from "./components/a-shopping-lists-header.vue";
import aShoppingListsContent from "./components/a-shopping-lists-content.vue";

export default {
  components: {
    aShoppingListsHeader,
    aShoppingListsContent,
  },
};
</script>

<style>
section {
  min-height: 100vh;
}

input {
  width: 40%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  text-align: center;
  margin-top: 0.5rem;
}

li {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: #fff;
}

a:hover {
  color: #e11d48;
}

button {
  background-color: #e11d48;
  border: none;
  padding: 0.5rem 0.2rem;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
}

.container-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
}

.shopping-list-data-content {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: center;
  margin: 0 auto;
}

.shopping-list-details {
  padding: 2rem;
}

.shopping-list-details-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
</style>
