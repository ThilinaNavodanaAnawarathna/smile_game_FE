<template>
<!--  <img src="../public/background.png" style="" alt="">-->
  <div :style="cssProps" class="height-set">
    <nav class="navbar navbar-expand navbar-dark">
      <router-link class="navbar-brand ms-1" to="/">
        <img src="./assets/logo.png" style="padding-left: 10px" height="100" alt="">

      </router-link>


      <div class="navbar-nav me-auto">
        <li class="nav-item" v-if="isAdmin">
          <router-link to="/admin" class="nav-link" active-class="active">
            Admin
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/" active-class="active">
            Home
          </router-link>
        </li>
      </div>

      <div class="navbar-nav ms-auto" v-if="!currentUser">
        <li class="nav-item">
          <router-link class="nav-link text-black" to="/register" active-class="active">
            Sign Up
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-black" to="/login" active-class="active">
            Sign In
          </router-link>
        </li>
      </div>

      <div class="navbar-nav ms-auto" v-if="currentUser">
        <li class="nav-item">
          <router-link class="nav-link text-black" to="/profile" active-class="active">
            {{ currentUser.name }}
          </router-link>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link text-black" @click="handleLogOut">
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
        backgroundImage: 'linear-gradient(to right, #403B4A , #E7E9BB)'
      }
    }
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),

    isAdmin() {
      return this.currentUser?.role === Role.ADMIN
    }
  },

  methods: {
    ...vuex.mapActions(["clearUser"]),

    handleLogOut() {
      this.clearUser();
      router.push("/login");
    }
  }
};
</script>

<style>
.height-set{
  height: 960px;
}
</style>
