<template>
  <div class="container">
    <header>
      <h1>Shopping list 2</h1>
    </header>

    <div class="container-content">
      <div class="shopping-list-data-sidebar">
        <ul>
          <h2>Your Shopping Lists</h2>
          <li
            class="shopping-list-data-titles"
            v-for="list in shoppingLists"
            :key="list.id"
          >
            <a href="#">{{ list.title }}</a>
            <button @click="removeItem(list.id)">Remove</button>
          </li>
        </ul>
      </div>

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
        <div v-else>
          Number of items in shopping list: {{ shoppingLists.length }}
          <!-- loop throught data -->
          <div v-for="lists in shoppingLists" :key="lists.id">
            <ul>
              <li v-for="items in lists.items" :key="items.id">
                {{ items.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      //variable for loading the data and set it to default state
      shoppingLists: null,
    };
  },

  //async function with lifecycle hook mounted
  async mounted() {
    try {
      const {
        data: { data: shoppingLists },
      } = await axios.get("/api/v1/shopping-lists");
      //set the data to shoppingList variable
      this.shoppingLists = shoppingLists;
      console.log(shoppingLists);
    } catch (err) {
      //console the error
      console.error("Error", err);
      //set the variable shopping list to error if there is error
      this.shoppingLists = { err };
    }
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
  },
};
</script>

<style scoped>
header {
  padding: 2rem;
  box-shadow: 0px 20px 10px -3px rgba(0, 0, 0, 0.1);
  background-color: #1e293b;
}

section {
  min-height: 100vh;
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
}

.shopping-list-data-sidebar {
  max-width: 500px;
  padding: 2rem;
}

.shopping-list-data-titles {
  margin: 1rem;
}

.shopping-list-data-titles > button {
  margin-left: 1rem;
}

.shopping-list-data-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}
</style>
