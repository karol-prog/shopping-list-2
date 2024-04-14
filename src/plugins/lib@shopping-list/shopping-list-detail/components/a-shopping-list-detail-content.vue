<template>
  <div class="shopping-list-data-detail">
    <ul v-for="item in shoppingList?.items" :key="item.id">
      <li class="shopping-list-data-items">
        <input
          v-model="item.is_checked"
          @change="isChecked(item)"
          type="checkbox"
        />
        <p>{{ item.name }}</p>
        <p>{{ item.value }}</p>
        <p>{{ item.unit }}</p>
      </li>
    </ul>

    <input
      v-model="newItem"
      @keydown.enter="addNewItem"
      type="text"
      placeholder="Enter your new item"
    />

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
    };
  },

  async mounted() {
    try {
      const {
        data: { data: shoppingLists },
      } = await axios.get(
        "https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists"
      );
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
          name: this.newItem.trim(),
          unit: "piece",
          value: 1,
          is_checked: false,
        };

        //check if input have something in it = true
        if (!this.newItem.trim().length) {
          return;
        } else {
          const response = await axios.post(
            `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items`,
            newItems
          );
          const newItemsToDetail = response.data.data;

          //push the new item to shopping list items
          this.shoppingList.items.push(newItemsToDetail);

          //reset the input
          this.newItem = "";
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //change the checked to true and back to false if it is unchecked
    async isChecked(item) {
      try {
        //update is_checked in items on backend
        await axios.put(
          `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`,
          {
            is_checked: item.is_checked,
          }
        );
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //remove items from details
    async removeItemDetail() {
      try {
        //filtter the items with is_checked = true
        const checkedItems = this.shoppingList.items.filter((item) => {
          return item.is_checked === true;
        });

        //iterate over each one and delete it from be
        checkedItems.forEach(async (item) => {
          await axios.delete(
            `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`
          );

          //updates items in shoping list with is_checked = true
          this.shoppingList.items = this.shoppingList.items.filter((item) => {
            return !item.is_checked;
          });
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
  margin-left: 1rem;
}

@media screen and (max-width: 425px) {
  .shopping-list-data-detail {
    width: 80%;
  }
}
</style>
