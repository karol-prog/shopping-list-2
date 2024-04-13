<template>
  <div class="shopping-list-data">
    <ul>
      <h2>Your Shopping List</h2>

      <form @submit.prevent="addNewList">
        <input
          type="text"
          placeholder="Enter new list"
          v-model="newListTitle"
        />
      </form>

      <li
        class="shopping-list-data-lists"
        v-for="list in shoppingLists"
        :key="list.id"
      >
        <a
          :href="`/shopping-lists/${list.id}`"
          @click.prevent="openShoppingListDetail(list)"
          >{{ list.title }}</a
        >
        <button @click="removeList(list.id)">Remove</button>

        <div v-if="!shoppingLists">
          <p>Loading Data</p>
        </div>

        <div v-else-if="shoppingLists.error">
          <p>Error while loading data: {{ shoppingLists.error }}</p>
        </div>

        <div class="list-item" v-else>
          <ul>
            <!-- render each item but in list screen only 3 items -->
            <li
              class="shopping-list-data-items"
              v-for="item in list.items.slice(0, 3)"
              :key="item.id"
            >
              <p>{{ item.name }}</p>
              <p>{{ item.value }}</p>
              <p>{{ item.unit }}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      //variable for loading the data and set it to default state
      shoppingLists: null,
      //for input
      newListTitle: "",
    };
  },

  //async function with lifecycle hook mounted to get data from server
  async mounted() {
    try {
      const {
        data: { data: shoppingLists },
      } = await axios.get(
        "https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists"
      );
      //set the data to shoppingList variable
      this.shoppingLists = shoppingLists;
    } catch (err) {
      //console the error
      console.error("Error", err);
      //set the variable shopping list to error if there is error
      this.shoppingLists = { err };
    }
  },

  methods: {
    //remove item from server
    async removeList(id) {
      try {
        const response = await axios.delete(
          `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${id}`
        );
        let deleteList = response.data.data;
        //delete from array deleted object
        this.shoppingLists.splice(deleteList, 1);
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //add new List
    async addNewList() {
      try {
        //fetch the promise and make an object in it POST
        const response = await axios.post(
          `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists`,
          {
            title: this.newListTitle,
            items: [],
          }
        );

        const newList = response.data.data;
        //push to the top new list
        this.shoppingLists.unshift(newList);
        //reset the input
        this.newListTitle = "";
      } catch (err) {
        console.log("Error:", err);
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
.shopping-list-data {
  width: 60%;
  padding: 2rem;
}

.shopping-list-data-lists {
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0.5rem;
}

@media screen and (max-width: 425px) {
  .shopping-list-data {
    width: 100%;
  }
}
</style>
