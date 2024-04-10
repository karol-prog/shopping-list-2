<template>
  <div class="shopping-list-data-detail">
    <ul v-for="item in shoppingList?.items" :key="item.id">
      <li class="shopping-list-data-items">
        <input type="checkbox" :id="item.id" @change="isChecked(item.id)" />
        <p>{{ item.name }}</p>
        <p>{{ item.value }}</p>
        <p>{{ item.unit }}</p>
      </li>
    </ul>
    <form @submit.prevent="addNewItem">
      <input type="text" placeholder="Enter your new item" v-model="newItem" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      shoppingList: null,
      newItem: "",
    };
  },

  async mounted() {
    try {
      const {
        data: { data: shoppingLists },
      } = await axios.get("/api/v1/shopping-lists");
      this.shoppingList = shoppingLists.find(
        ({ id }) => id == this.$route.params.id
      );
      console.log("Shopping List:", this.shoppingList.items);
    } catch (error) {
      console.error("Error:", error);
      this.shoppingList = { error };
    }
  },

  methods: {
    async addNewItem() {
      try {
        const newItems = {
          name: this.newItem,
          unit: "pieces",
          value: 1,
          is_checked: false,
        };
        await axios.post(`/api/v1/shopping-lists/items`, newItems);
      } catch (err) {
        console.error("Error:", err);
      }
    },

    async isChecked(itemId) {
      try {
        await axios.post(
          `/api/v1/shopping-lists/${this.$route.params.id}/items/${itemId}`,
          {
            is_checked: true,
          }
        );
      } catch (err) {
        console.error("Error:", err);
      }
    },
  },
};
</script>

<style scoped>
.shopping-list-data {
  padding: 2rem;
}

.shopping-list-data-detail {
  width: 60%;
  margin: 1rem;
  box-shadow: 0px 0px 20px 0px rgba(1, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 0.5rem;
}

.shopping-list-data-lists > a {
  font-size: 1.5rem;
  font-weight: bold;
}

.shopping-list-data-lists > button {
  margin-left: 1rem;
}

.shopping-list-data-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0.5rem;
}
</style>
