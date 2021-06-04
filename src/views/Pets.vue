<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <!-- Loop through each dog in dogs array !-->
      <v-flex xs12 sm4 md3 v-for="pet in dogs" :key="pet.breed">
        <!-- insert dogs with the appDog component !-->
        <!-- pass the dog prop to our dog component using v-bind's shortcut : !-->
        <app-dog :dog="pet" @addToFavorites="addToFavorites"></app-dog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
//import Dogs from data/dogs
import { Dogs } from "../data/dogs";
import Dog from "../components/Dog.vue";
//import axios and add the base URL for our API
import axios from "axios";
axios.defaults.baseURL = "https://dog.ceo/api";
//api documentation: https://dog.ceo/dog-api/

export default {
  components: {
    appDog: Dog,
  },
  data() {
    return {
      dogs: Dogs,
    };
  },
  created() {
    //clear the dogs' images (so we don't see them for a moment when we load the page)
    this.dogs.forEach((dog) => {
      dog.img = "";
    });
    //create an array of links to dog images based on each dog's breed
    const linksArray = this.dogs.map(
      (dog) => "/breed/" + dog.breed + "/images/random"
    );
    //To create an array of queries we will use a .map method on our linksArray, performing axios.get for each link
    //axios.all allows us to perform multiple network requests and wait for all of the responses
    axios.all(linksArray.map((link) => axios.get(link))).then(
      //use axios.spread to spread this array into multiple arguments.
      axios.spread((...res) => {
        //iterate through dogs array again, replacing each dog image with a new one from the API
        this.dogs.forEach((dog, index) => {
          dog.img = res[index].data.message;
        });
      })
    );
    //What's going on here? The forEach() method executes a provided function once for each array element in linksArray. It's basically looping through the static data and adding a random image to this.dogs. So, after we've got an array of images in response, we are iterating through our dogs array again, replacing each dog image with a corresponding new one from the API (index is the index of the current element being processed in the array; it is the same for both arrays because response objects are placed in the same order they were sent).
  },
  methods: {
    ...mapActions(["addToFavorites"]),
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
</style>