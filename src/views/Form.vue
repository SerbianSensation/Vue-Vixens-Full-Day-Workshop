<template>
  <div class="form-wrapper">
    <!-- only show completed form if the form has been submitted !-->
    <div class="text-xs-center" v-if="submitted">
      <h2>Thank you for you interest, we will contact you soon</h2>
      <div class="details text-xs-left">
        <h3 class="blue-grey--text">Customer details</h3>
        <p><strong>Name:</strong> {{ name }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Phone:</strong> {{ phone }}</p>
      </div>
      <v-btn to="/">Go to homepage</v-btn>
    </div>
    <!-- show this form if they have not submitted it yet !-->
    <v-form v-else v-model="valid">
      <v-text-field
        label="Name"
        required
        :rules="nameRules"
        v-model="name"
      ></v-text-field>
      <v-text-field
        label="Email"
        required
        :rules="emailRules"
        v-model="email"
      ></v-text-field>
      <v-text-field
        label="Phone"
        required
        :rules="phoneRules"
        v-mask="'(###) ### - ####'"
        v-model="phone"
      ></v-text-field>
      <v-btn @click="submit" :disabled="!valid">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
//import mask, which will let us prevent letters from being entered as a phone number
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask, //register mask to our component
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      submitted: false,
      valid: true,
      nameRules: [
        (name) => !!name || "Name is required", //name must be included !! negates the negation of name
        (name) => name.length > 2 || "Name must be longer than 2 characters",
      ], //rules for inserting a name into the name field
      emailRules: [
        (email) => !!email || "Email is required",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email must be valid",
      ], //use regex to ensure email is valid
      phoneRules: [
        (phone) => !!phone || "Phone is required",
        (phone) =>
          phone.length >= 7 || "Phone number should be at least 7 digits",
      ],
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("clearFavorites");
      this.submitted = true;
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  padding: 40px;
  text-align: center;
}
.details {
  padding-top: 30px;
}
h3 {
  padding-bottom: 20px;
}
</style>