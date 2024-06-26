<template>
  <div class="shopping-list-data">
    <h2>Your Shopping List</h2>
    <input
      v-model="newListTitle"
      @keydown.enter="addNewList"
      type="text"
      placeholder="Enter new list"
    />

    <!-- Loading the data -->
    <div v-if="!shoppingLists">
      <div class="lds-dual-ring"></div>
    </div>

    <!-- error while loading -->
    <div v-else-if="shoppingLists.error">
      <p>Error while loading data: {{ shoppingLists.error }}</p>
    </div>

    <!-- successfull data load -->
    <div
      v-else
      v-for="list in shoppingLists"
      :key="list.id"
      class="shopping-list-data-lists"
    >
      <a
        :href="`/shopping-lists/${list.id}`"
        @click.prevent="openShoppingListDetail(list)"
        >{{ list.title }}</a
      >
      <button @click="removeList(list.id)">Remove</button>

      <div class="list-item">
        <ul>
          <!-- render each item but in list screen only 3 items -->
          <li
            v-for="item in list.items.slice(0, 3)"
            :key="item.id"
            class="shopping-list-data-items"
          >
            <p>{{ item.name }}</p>

            <div class="value-units">
              <p>{{ item.value }}</p>
              <p>{{ item.unit }}</p>
            </div>
          </li>
        </ul>
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

        //filter out from shopping list the id that match delete list
        this.shoppingLists = this.shoppingLists.filter((list) => {
          return list.id !== deleteList.id;
        });
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //add new List
    async addNewList() {
      try {
        //check if input have something in it = true
        if (!this.newListTitle.trim().length) {
          return;
        } else {
          //fetch the promise and make an object in it POST
          const response = await axios.post(
            `https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists`,
            {
              title: this.newListTitle.trim(),
              items: [],
            }
          );
          const newList = response.data.data;

          //push to the top new list
          this.shoppingLists.unshift(newList);

          //reset the input
          this.newListTitle = "";
        }
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
  width: 50%;
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

.list-item {
  padding: 1rem;
}

.shopping-list-data-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
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
  .shopping-list-data {
    width: 100%;
  }
}
</style>
