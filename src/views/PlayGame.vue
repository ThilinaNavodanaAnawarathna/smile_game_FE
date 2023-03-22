<template >
  <div style="">
  <div class="container-fluid row mt-5" >
    <div class="col-12 game-div">
      <img style="margin: auto; display: block" :src="imageUrl" alt="">
    </div>
    <div class="row">
      <div class="card col-2 d-block m-auto p-2 mt-2">
        <h3 class="text-center">Marks  : <span>{{currentUserScore}}</span></h3>
      </div>
    </div>
    <div class="col-4"></div>
    <div class="col-4 mt-5 game-input form-group card text-center">
      <div class="card-body">
        <h6>Time Counter</h6>
        <h2 class="text-center">{{ original.count }}</h2>
      <input
        class="m-2 form-control text-center"
        type="number"
        v-model="userAnswer"
      >
      <button
        class="btn btn-danger btn-lg  text-center"
        @click="submitAnswer"
      >Submit
      </button>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
  </div>
</template>

<script>
import {computed, onMounted, reactive, readonly, ref, watchEffect} from "vue";
import GameService from "@/services/gameService";
import Swal from "sweetalert2";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import difficultyType from "@/models/DifficultyType";
import DifficultyType from "@/models/DifficultyType";
import Score from "@/models/score";
import User from "@/models/user";
import Result from "@/models/result";

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
      GameService.setScore(resultObj.value)
    }

    const submitAnswer = () => {
      console.log("answer submitted : ", userAnswer.value);
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
        console.log(counter);
        counter--;
        original.count--
        if (counter < 1) {
          clearInterval(interval);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Time over!',
            confirmButtonText: 'Menu',
            denyButtonText: "retry",
            showDenyButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("menu")
            }
              // else if(result.dismiss === Swal.DismissReason.cancel){
              //
            // }
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
      GameService.getScore(currentUser.id).then((resp) => {
        console.log("current score", resp.data.score)
        currentUserScore.value = resp.data.score;
      })
    }


    onMounted(async () => {
      let gameResp = await GameService.callSmileAPI();
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
  height: 450px;
}

.game-input {
  height: 250px;
  /*background-color: red;*/
}

.background-set{

  background-color: red;
}
</style>