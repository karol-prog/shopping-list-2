<template>
  <!-- Loading the data -->
  <div v-if="!shoppingLists">
    <div class="lds-dual-ring"></div>
  </div>

  <!-- error while loading -->
  <div v-else-if="shoppingLists.error">
    <p>Error while loading data: {{ shoppingLists.error }}</p>
  </div>

  <!-- successfull data load -->
  <div v-else class="shopping-list-data-detail">
    <ul v-for="item in shoppingLists?.items" :key="item.id">
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

          <div class="value-units">
            <p>{{ item.value }}</p>
            <p>{{ item.unit }}</p>
          </div>
        </div>

        <!-- for editing -->
        <div
          v-else
          @keypress.enter="addUpdatedItem(item)"
          @keydown.esc="hideEditItem"
          class="items-prop"
        >
          <input v-model="newTitle" type="text" placeholder="Enter new item" />
          <input v-model="newValue" type="number" placeholder="1" min="0" />
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
      shoppingLists: null,
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
      this.shoppingLists = shoppingLists.find(
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
          this.shoppingLists.items.push(newItemsToDetail);

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
        const checkedItems = this.shoppingLists.items.filter((item) => {
          return item.is_checked === true;
        });

        //iterate over each one and delete it from be
        checkedItems.forEach(async (item) => {
          await axios.delete(
            `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`
          );

          //updates items in shoping list with is_checked = true
          this.shoppingLists.items = this.shoppingLists.items.filter((item) => {
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

          //reset the variables
          this.newTitle = "";
          this.newValue = "";
          this.newUnit = "";

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
  width: 50%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.value-units {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

/* loading data */
.lds-dual-ring,
.lds-dual-ring:after {
  box-sizing: border-box;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6.4px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 425px) {
  .shopping-list-data-detail {
    width: 80%;
  }
}
</style>
