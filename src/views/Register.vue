<template>
  <div style="left: 0; top: 0;position: absolute; width: 100%;height: 100%; background-color: white"></div>
  <div class="container mt-5 pt-5">
    <div style="padding-top: 50px !important; padding-bottom: 60px !important; background-color: rgba(219, 89, 2,0.7)" class="card ms-auto me-auto p-3 shadow-lg custom-card">

      <h4 class="mt-4 text-center text-white">Register</h4>
      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>

      <form
        @submit.prevent="handleRegister"
        novalidate
        :class="submitted ? 'was-validated' : ''">

        <div class="text-white form-group">
          <label for="name">Full Name</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            class="form-control"
            name="name"
            placeholder="Full Name"
            required>
          <div class="invalid-feedback">
            Full name is required.
          </div>
        </div>

        <div class=" text-white form-group">
          <label for="username">Username</label>
          <input
            v-model="formData.username"
            type="text"
            id="username"
            class="form-control"
            name="username"
            placeholder="Username"
            required>
          <div class="text-white invalid-feedback">
            Username is required.
          </div>
        </div>

        <div class="text-white form-group">
          <label for="password">Password</label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="form-control"
            name="password"
            placeholder="Password"
            required>
          <div class="invalid-feedback">
            Password is required.
          </div>
        </div>

        <button
          class="btn btn-dark w-50 d-block m-auto mt-3"
          @click="submitted = true"
          :disabled="loading"
        >
          Sign Up
        </button>
      </form>

      <router-link
        to="/"
        class="btn btn-link"
        style="color: #e8ede9;"
      >
        I have an account!
      </router-link>
    </div>
  </div>
</template>

<script>
import User from "@/models/User";
import vuex from "vuex";
import router from "@/router";
import AuthenticationService from "@/services/AuthenticationService";

export default {
  name: "Register",
  data() {
    return {
      formData: new User(),
      loading: false,
      submitted: false,
      errorMessage: ""
    };
  },

  computed: {
    ...vuex.mapGetters(["currentUser"])
  },

  mounted() {
    if (this.currentUser?.username) {
      router.push("/profile");
    }
  },

  methods: {
    handleRegister() {
      if (!this.formData.username || !this.formData.password || !this.formData.name) {
        return;
      }

      this.loading = true;

      AuthenticationService.singUp(this.formData).then(() => {
        router.push("/");
      }).catch((err) => {
        console.log(err);
        if (err?.response?.status === 409) {
          this.errorMessage = "Username is not valid!";
        } else {
          this.errorMessage = "Unexpected Error occurred.!!";
        }
      }).then(() => {
        this.loading = false;
      });
    }


  }
};
</script>

<style scoped>

</style>