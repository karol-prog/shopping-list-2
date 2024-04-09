<template>
  <div class="container">
    <aShoppingListsHeader />

    <div class="container-content">
      <aShoppingListsSidebar :shoppingList="shoppingLists" />

      <div class="shopping-list-data-content">
        <!-- if shoppingLists return false from API show data loading -->
        <div v-if="!shoppingLists">
          <p>Data Loading</p>
        </div>

        <!-- if shoppingList throw error in loading data -->
        <div v-else-if="shoppingLists.error">
          Error while reading data: {{ shoppingLists.error }}
        </div>

        <!-- Successful load data -->
        <div v-else class="shopping-list-details">
          <h2>Number of items in shopping list: {{ shoppingLists.length }}</h2>
          <!-- loop throught data in shoppingLists-->
          <div v-for="lists in shoppingLists" :key="lists.id">
            <ul>
              <!-- inner loop to take each item in lists.items -->
              <li
                class="shopping-list-details-list"
                v-for="items in lists.items"
                :key="items.id"
              >
                <h4>{{ items.name }}</h4>
                <p>{{ items.value + " " + items.unit }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* components */
import aShoppingListsHeader from "./components/a-shopping-lists-header.vue";
import aShoppingListsSidebar from "./components/a-shopping-lists-sidebar.vue";

/* axios */
import axios from "axios";

export default {
  components: {
    aShoppingListsHeader,
    aShoppingListsSidebar,
  },

  data() {
    return {
      //variable for loading the data and set it to default state
      shoppingLists: null,
    };
  },

  //async function with lifecycle hook mounted to get data from server
  async mounted() {
    try {
      const {
        data: { data: shoppingLists },
      } = await axios.get("/api/v1/shopping-lists");
      //set the data to shoppingList variable
      this.shoppingLists = shoppingLists;
      //console the structure of data in console
      console.log(shoppingLists);
    } catch (err) {
      //console the error
      console.error("Error", err);
      //set the variable shopping list to error if there is error
      this.shoppingLists = { err };
    }
  },

  methods: {
    /* openShoppingListDetail({ id }) {
      this.$router.push({ name: "Shopping List - Detail", params: { id } });
    }, */
  },
};
</script>

<style>
section {
  min-height: 100vh;
}

input {
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
  min-height: 100vh;
}

/* .shopping-list-data-sidebar {
  max-width: 500px;
  padding: 2rem;
  border-right: 0.5px solid #1e293b;
}

.shopping-list-data-titles {
  margin: 1rem;
}

.shopping-list-data-titles > button {
  margin-left: 1rem;
} */

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
