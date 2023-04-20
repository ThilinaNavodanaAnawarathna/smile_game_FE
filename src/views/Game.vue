<template >
  <img src="../assets/background.jpg" class=" rounded shadow-lg" style="position: absolute; left: 0; top: 0;height: 99%; width: 100%; opacity: 0.5; z-index: 1"  alt="">
  <div style="left: 0; top: 0;position: absolute; width: 100%;height: 100%; background-color: white;"></div>
  <br><br><br><br>
  <div class="container-fluid row mt-5" >
    <div class="col-6 game-div" style="box-shadow: 0px 0px 10px #35495e;z-index: 1">
      <img style="margin: auto; display: block; width:100%" :src="imageUrl" alt="">
    </div>
    <div class="col-6 " style="padding-left:50px;z-index: 1">
      <div class="row">
        <div style="background-color: rgba(219, 89, 2,1)" class="card text-white col-4 d-block m-auto p-2 mt-2">
          <h3 class="text-center">Marks  : <span>{{currentUserScore}}</span></h3>
        </div>
        <div style="background-color: rgba(219, 89, 2,0.5)" class="col-12 d-block m-auto mt-5 game-input form-group card text-center">
          <div class="card-body">
            <h6>Time Counter</h6>
            <h2 class="text-center">{{ original.count }}</h2>
            <input
              class="m-2 form-control text-center"
              type="number"
              v-model="userAnswer"
              max="9"
              min="0"
            >
            <button
              class="btn btn-dark btn-lg  text-center"
              @click="submitAnswer"
            >Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="position: absolute; right: 250px; bottom: 100px; z-index: 1" >
    <router-link class="navbar-brand ms-1" to="/home"><button type="button" class="btn btn-secondary">Home</button></router-link>
    <router-link class="navbar-brand ms-1" to="/"><button type="button"  class="btn btn-danger">Logout</button></router-link>
  </div>

</template>

<script>
import {computed, onMounted, reactive, readonly, ref, watchEffect} from "vue";
import GameService from "@/services/GameService";
import Swal from "sweetalert2";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import difficultyType from "@/models/DifficultyType";
import DifficultyType from "@/models/DifficultyType";
import Score from "@/models/Score";
import User from "@/models/User";
import Result from "@/models/Result";

export default {
  name: "PlayGame",

  setup() {
    const store = useStore();
    const router = useRouter();
    const {currentUser} = store.getters;
    const imageUrl = ref("");
    const correctAnswer = ref(null);
    const userAnswer = ref(null);
    const countDown = ref(0)
    const currentUserScore = ref(0)

    const resultObj = ref(new Result())
    const userObj = ref(new User())

    const difficultyLevel = computed(() => store.getters.difficultyLevel)

    const original = reactive({count: 0})

    const copy = readonly(original)

    watchEffect(() => {
      // works for reactivity tracking
      console.log(copy.count)
    })

    const saveAnswerFunc = (isCorrect) => {

      let difficultyLVL = "Easy";
      if (difficultyLevel.value === DifficultyType.EASY) difficultyLVL = "Easy";
      if (difficultyLevel.value === DifficultyType.MEDIUM) difficultyLVL = "Medium";
      if (difficultyLevel.value === DifficultyType.HARD) difficultyLVL = "Hard";

      userObj.value.id=currentUser.id;
      resultObj.value.user = userObj;
      resultObj.value.difficultyLevel = difficultyLVL;
      resultObj.value.isCorrect = isCorrect;

      console.log("saveAnswerFunc : ", currentUser?.id, resultObj)
      GameService.setUserScore(resultObj.value)
    }

    const submitAnswer = () => {
      if (userAnswer.value === correctAnswer.value) {
        Swal.fire(
          "You won",
          "You have won the level",
          "success"
        );
        saveAnswerFunc(true)

      } else {
        saveAnswerFunc(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are lost!"
        });

      }

      setTimeout(function () {
        window.location.reload();
      }, 2000);

    };

    const startCountdown = seconds => {
      let counter = seconds;
      countDown.value = seconds;
      original.count = seconds;
      const interval = setInterval(() => {
        counter--;
        original.count--
        if (counter < 1) {
          clearInterval(interval);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Time over!',
            confirmButtonText: 'Menu',
            denyButtonText: "Retry",
            showDenyButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/home")
            }
            else if (result.isDenied) {
              window.location.reload();
            }
          })
        }
      }, 1000);
    };

    const setCountDownOnDifficulty = () => {
      if (difficultyLevel.value === difficultyType.EASY) {
        startCountdown(50)
      } else if (difficultyLevel.value === difficultyType.MEDIUM) {
        startCountdown(40)
      } else if (difficultyLevel.value === difficultyType.HARD) {
        startCountdown(30)
      }
    }


    const getCurrentUserScore = () => {
      GameService.getUserScore(currentUser.id).then((resp) => {
        currentUserScore.value = resp.data.score;
      })
    }


    onMounted(async () => {
      let gameResp = await GameService.getQuestion();
      imageUrl.value = gameResp.data["question"];
      correctAnswer.value = gameResp.data["solution"];
      setCountDownOnDifficulty()
      getCurrentUserScore()
    });

    return {
      imageUrl,
      userAnswer,
      countDown,
      original,
      currentUserScore,
      submitAnswer
    };
  }
};


</script>

<style scoped>
.game-div {

}

.game-input {

}

.background-set{

  background-color: red;
}
</style>