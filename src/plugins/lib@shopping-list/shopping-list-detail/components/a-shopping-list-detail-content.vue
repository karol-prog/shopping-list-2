<template>
  <div class="shopping-list-data-detail">
    <ul v-for="item in shoppingList?.items" :key="item.id">
      <li class="shopping-list-data-items">
        <input
          type="checkbox"
          v-model="item.is_checked"
          @change="isChecked(item)"
        />
        <p>{{ item.name }}</p>
        <p>{{ item.value }}</p>
        <p>{{ item.unit }}</p>
      </li>
    </ul>
    <form @submit.prevent="addNewItem">
      <input type="text" placeholder="Enter your new item" v-model="newItem" />
    </form>
    <button class="detail-btn" @click="removeItemDetail">Remove item</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      shoppingList: null,
      newItem: "",
      isCheck: null,
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
    } catch (error) {
      console.error("Error:", error);
      this.shoppingList = { error };
    }
  },

  methods: {
    //add new items to details
    async addNewItem() {
      try {
        const newItems = {
          name: this.newItem,
          unit: "piece",
          value: 1,
          is_checked: false,
        };
        const response = await axios.post(
          `/api/v1/shopping-lists/${this.$route.params.id}/items`,
          newItems
        );
        const newItemsToDetail = response.data.data;
        //push the new item to shopping list items
        this.shoppingList.items.push(newItemsToDetail);
        //rest the input
        this.newItem = "";
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //change the checked to true and back to false if it is unchecked
    async isChecked(item) {
      this.isCheck = item.is_checked;
      try {
        //update is_checked in items on backend
        await axios.put(
          `/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`,
          {
            is_checked: this.isCheck,
          }
        );
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //remove items from details
    async removeItemDetail() {
      try {
        const checkedItems = this.shoppingList.items.filter((item) => {
          return item.is_checked === true;
        });

        console.log(checkedItems);
        checkedItems.forEach(async (item) => {
          await axios.delete(
            `/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`
          );
        });
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
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
}

.detail-btn {
  margin-top: 1rem;
}
</style>
