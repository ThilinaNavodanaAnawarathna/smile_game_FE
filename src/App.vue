<template>
<!--  <img src="../public/background.png" style="" alt="">-->
  <div :style="cssProps" class="height-set">
    <nav class="navbar navbar-expand navbar-dark bg-light shadow-lg ">
      <router-link class="navbar-brand ms-1" to="/">
        <h1 style="margin-left:20px; color: #202020; font-weight: bold"> Smile<img src="./assets/smile-yana.gif" style="width: 50px" alt=""></h1>
<!--        <img src="./assets/logo.png" style="padding-left: 10px" height="100" alt="">-->
      </router-link>


      <div class="navbar-nav ms-auto" v-if="!currentUser"  style="margin-right:100px;font-weight: bold">
        <li class="nav-item">
          <router-link class="nav-link text-black-50" to="/register" active-class="active">
            Sign Up
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-black-50" to="/login" active-class="active">
            Sign In
          </router-link>
        </li>
      </div>
      <div class="navbar-nav ms-auto" v-if="currentUser" style="margin-right:100px;font-weight: bold">
        <li class="nav-item ">
          <router-link class="nav-link text-black-50" to="/profile" active-class="active">
            {{ currentUser.name }}
          </router-link>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link text-black-50" @click="handleLogOut">
            Sign Out
          </a>
        </li>
      </div>
    </nav>

    <div class="container" >
      <router-view />
    </div>
  </div>
</template>
<script>

import vuex from "vuex";
import Role from "@/models/role";
import router from "@/router";

export default {
  data() {
    return {
      cssProps: {
        backgroundImage: 'linear-gradient(to right, #ffffff , #ffffff)'
      }
    }
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),

  },

  methods: {
    ...vuex.mapActions(["clearUser"]),

    handleLogOut() {
      this.clearUser();
      router.push("/");
    }
  }
};
</script>

<style>
.height-set{
  height: 960px;
}
</style>
