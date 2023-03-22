<template class="">
  <div class="container-fluid">
    <div class="row container-fluid">
      <div class="col-6 container-fluid">
        <div class="row pt-5">
<!--          <img src="../assets/main.png" class=" rounded shadow-lg"  alt="">-->
          <h4 class="m-0 mb-3" style="margin-left:20px; color: #202020; font-weight: bold">Smile Game <br></h4>

          <p class="font-monospace">Smile game is an interactive game that challenges players to test their knowledge in a fun and engaging way.In a Smile game, the player is presented with math questions, and they have a limited amount of time to select the correct answer. The game awards points for each correct answer and deducts 5 points for incorrect answers</p>
          <p class="font-monospace">Easy level: 50 seconds to answer each question, and 10 marks awarded for each correct answer</p>
          <p class="font-monospace">Medium level: 40 seconds to answer each question, and 25 marks awarded for each correct answer</p>
          <p class="font-monospace">Hard level: 30 seconds to answer each question, and 50 marks awarded for each correct answer</p>
        </div>
        <h5 class="mt-4 mb-4"> Now We Play the game ...!</h5>
        <button
          @click="selectDifficulty(DifficultyType.EASY)"
          type="button" data-toggle="modal" data-target="#selectdificulty" class="me-4 btn btn-lg text-white" style="font-weight: 400;background-color: steelblue">Easy</button>
        <button
          @click="selectDifficulty(DifficultyType.MEDIUM)"
          type="button" data-toggle="modal" data-target="#selectdificulty" class="me-4 btn btn-lg text-white" style="font-weight: 400;background-color: green">Normal</button>
        <button
          @click="selectDifficulty(DifficultyType.HARD)"
          type="button" data-toggle="modal" data-target="#selectdificulty" class="me-4 btn btn-lg text-white" style="font-weight: 400;background-color: indianred">Hard</button>
      </div>
      <div class="col-6 p-5" >
<!--        <div class="background-set shadow-lg " style="border-radius: 10px">-->
<!--          <img src="../assets/main.png" alt="">-->
<!--        </div>-->
        <div class="card shadow">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Ashen</td>
              <td>125</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Ashen</td>
              <td>125</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Ashen</td>
              <td>125</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
<!--  <div class="row p-3 container-fluid">-->
<!--    <div class="card col-3">-->
<!--      <img class="card-img-top" alt="Card image cap">-->
<!--      <div class="card-body">-->
<!--        <h5 class="card-title">Card title</h5>-->
<!--        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>-->
<!--        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed, onMounted} from "vue";
import DifficultyType from "@/models/DifficultyType";

export default {
  name: "Home",
  computed: {
    DifficultyType() {
      return DifficultyType
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const {currentUser} = store.getters;

    const difficultyLevel = computed(() => store.getters.difficultyLevel)

    const startGame = () => {
      router.push("play-game")
    }

    const goToMenuFunc = () => {
      router.push("menu")
    }

    const selectDifficulty = (difficultyLvl) => {
      console.log("difficulty level : ", difficultyLvl, difficultyLevel.value)
      store.dispatch("updateDifficultyLevel", difficultyLvl);
      router.push("play-game")
    }

    onMounted(() => {
      console.log("difficulty Level onMounted ", difficultyLevel.value)
      if (difficultyLevel.value === null) {
        store.dispatch("updateDifficultyLevel", DifficultyType.EASY);
      }
    })

    return {
      currentUser,
      startGame,
      selectDifficulty,
      goToMenuFunc
    };
  }

};

</script>

<style scoped>
.background-set{
  /*height: vh;*/
  /*background-image: url("../assets/main.png");*/
}

.device-icon {
  font-size: 100px;
  color: darkblue;
}

.color-item {
  width: 28px;
  height: 28px;
  border-radius: 14px;
  cursor: pointer;
  position: relative;
}

.color-item.active:after {
  content: "";
  position: absolute;
  width: 36px;
  height: 36px;
  left: -4px;
  top: -4px;
  border-radius: 50%;
  border: 2px solid #8888;
}
</style>