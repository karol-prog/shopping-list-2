<template>
  <div class="shopping-list-data-sidebar">
    <ul>
      <h2>Your Shopping Lists</h2>

      <li
        class="shopping-list-data-titles"
        v-for="list in shoppingList"
        :key="list.id"
      >
        <a
          :href="`/shopping-lists/${list.id}`"
          @click.prevent="openShoppingListDetail(list)"
          >{{ list.title }}</a
        >
        <button @click="removeItem(list.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    shoppingList: {
      type: Array,
      required: true,
    },
  },

  methods: {
    //remove item from server
    async removeItem(id) {
      /* console.log(id); */
      try {
        await axios.delete(`/api/v1/shopping-lists/${id}`);
        this.shoppingLists = this.shoppingLists.filter((list) => {
          list.id !== id;
        });
      } catch (err) {
        console.error("Error:", err);
      }
    },
    //redirect to details by id
    openShoppingListDetail({ id }) {
      this.$router.push({ name: "Shopping List - Detail", params: { id } });
    },
  },
};
</script>
<style scoped>
.shopping-list-data-sidebar {
  max-width: 500px;
  padding: 2rem;
  border-right: 0.5px solid #1e293b;
}

.shopping-list-data-titles {
  margin: 1rem;
}

.shopping-list-data-titles > button {
  margin-left: 1rem;
}
</style>
