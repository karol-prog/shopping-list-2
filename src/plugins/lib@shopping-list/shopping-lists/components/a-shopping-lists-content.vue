<template>
  <div class="shopping-list-data-sidebar">
    <ul>
      <h2>Your Shopping List</h2>

      <li
        class="shopping-list-data-titles"
        v-for="list in shoppingLists"
        :key="list.id"
      >
        <a
          :href="`/shopping-lists/${list.id}`"
          @click.prevent="openShoppingListDetail(list)"
          >{{ list.title }}</a
        >
        <button @click="removeItem(list.id)">Remove</button>

        <div v-if="!shoppingLists">
          <p>Loading Data</p>
        </div>

        <div v-else-if="shoppingLists.error">
          <p>Error while loading data: {{ shoppingLists.error }}</p>
        </div>

        <div v-else>
          <ul>
            <li v-for="item in list.items" :key="item.id">
              <p>{{ item.name }}</p>
              <p>{{ item.value }}</p>
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
  /*  max-width: 500px;
  padding: 2rem;
  border-right: 0.5px solid #1e293b; */
  padding: 2rem;
}

.shopping-list-data-titles {
  margin: 1rem;
}

.shopping-list-data-titles > button {
  margin-left: 1rem;
}
</style>
