<template >
  <div style="">
  <div class="container-fluid row mt-5" >
    <div class="col-12 game-div">
      <img style="margin: auto; display: block" :src="imageUrl" alt="">
    </div>
    <div class="col-12"></div>
    <div class="col-12 mt-5 game-input form-group card text-center">
      <div class="card-body">
        <h6>Time Counter</h6>
        <h2 class="text-center">0.00</h2>
      <input
        class="m-2 form-control"
        type="number"
        v-model="userAnswer"
      >
      <button
        class="btn btn-success btn-lg  text-center"
        @click="submitAnswer"
      >Submit
      </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import GameService from "@/services/gameService";
import Swal from "sweetalert2";

export default {
  name: "PlayGame",

  setup() {
    const imageUrl = ref("");
    const correctAnswer = ref(null);
    const userAnswer = ref(null);

    const submitAnswer = () => {
      console.log("answer submitted : ", userAnswer.value);
      if (userAnswer.value === correctAnswer.value) {
        Swal.fire(
          "You won",
          "You have won the level",
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are lost!"
        });

      }

      setTimeout(function() {
        window.location.reload();
      }, 2000);

    };


    onMounted(async () => {
      let gameResp = await GameService.callSmileAPI();
      imageUrl.value = gameResp.data["question"];
      correctAnswer.value = gameResp.data["solution"];
    });

    return {
      imageUrl,
      userAnswer,
      submitAnswer
    };
  }
};


</script>

<style scoped>
.game-div {
  height: 500px;
}

.game-input {
  height: 200px;
  /*background-color: red;*/
}

.background-set{

  background-color: red;
}
</style>