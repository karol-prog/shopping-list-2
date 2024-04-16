<template>
  <div class="shopping-list-data-detail">
    <ul v-for="item in shoppingList?.items" :key="item.id">
      <li class="shopping-list-data-items">
        <input
          v-model="item.is_checked"
          @change="isChecked(item)"
          type="checkbox"
        />

        <!-- no editing -->
        <div
          v-if="changeItems !== item.id"
          @click="showItemToShow(item.id)"
          class="items-prop"
        >
          <p>{{ item.name }}</p>
          <p>{{ item.value }}</p>
          <p>{{ item.unit }}</p>
        </div>

        <!-- for editing -->
        <div
          v-else
          @keypress.enter="addUpdatedItem(item)"
          @keydown.esc="hideEditItem"
          class="items-prop"
        >
          <input v-model="newTitle" type="text" />
          <input v-model="newValue" type="number" placeholder="1" />
          <select v-model="newUnit">
            <option value="grams">grams</option>
            <option value="kilograms">kilograms</option>
            <option value="piece">piece</option>
            <option value="package">packages</option>
          </select>
        </div>
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
      changeItems: null,
      newTitle: "",
      newValue: "",
      newUnit: "",
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

    //update items
    async addUpdatedItem(item) {
      try {
        if (!this.newTitle.trim().length || !this.newUnit.trim().length) {
          return;
        } else {
          const response = await axios.put(
            `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`,
            {
              name: this.newTitle,
              value: this.newValue,
              unit: this.newUnit,
            }
          );
          const updatedItem = response.data.data;

          //change the values to update one
          item.name = updatedItem.name;
          item.value = updatedItem.value;
          item.unit = updatedItem.unit;

          //back to default div
          this.changeItems = null;
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //for showing the editing div in current selected item
    showItemToShow(id) {
      //write the id to changeItems var
      this.changeItems = id;
    },

    //hide editing item with esc
    hideEditItem() {
      this.changeItems = !this.changeItems;
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
  grid-template-columns: 10% 1fr;
  align-items: center;
  padding: 0.5rem;
}

.detail-btn {
  margin-left: 1rem;
}

.items-prop {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 425px) {
  .shopping-list-data-detail {
    width: 80%;
  }
}
</style>
