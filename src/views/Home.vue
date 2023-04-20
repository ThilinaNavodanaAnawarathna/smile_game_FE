<template class="">
  <div class="container-fluid">
    <div class="row container-fluid">
      <div class="col-6 container-fluid">
        <div class="row pt-5">
          <!--          <img src="../assets/main.png" class=" rounded shadow-lg"  alt="">-->
          <h4 class="m-0 mb-3" style="margin-left:20px; color: #202020; font-weight: bold">Smile Game <br></h4>
          <p class="">Smile game is an interactive game that challenges players to test their knowledge in a fun and
            engaging way.In a Smile game, the player is presented with math questions, and they have a limited amount of
            time to select the correct answer. The game awards points for each correct answer and deducts 5 points for
            incorrect answers</p>
          <p class=""><span style="font-weight: bold">Easy level:</span> 50 seconds to answer each question, and 10
            marks awarded for each correct answer</p>
          <p class=""><span style="font-weight: bold">Medium level:</span> 40 seconds to answer each question, and 25
            marks awarded for each correct answer</p>
          <p class=""><span style="font-weight: bold">Hard level: </span> 30seconds to answer each question, and 50
            marks awarded for each correct answer</p>
        </div>
        <h5 class="mt-4 mb-4"> Now We Play the game ...!</h5>
        <button
          @click="selectDifficulty(DifficultyType.EASY)"
          type="button" data-toggle="modal" data-target="#selectdificulty" class="me-4 btn btn-lg text-white"
          style="font-weight: 400;background-color: steelblue">Easy
        </button>
        <button
          @click="selectDifficulty(DifficultyType.MEDIUM)"
          type="button" data-toggle="modal" data-target="#selectdificulty" class="me-4 btn btn-lg text-white"
          style="font-weight: 400;background-color: green">Normal
        </button>
        <button
          @click="selectDifficulty(DifficultyType.HARD)"
          type="button" data-toggle="modal" data-target="#selectdificulty" class="me-4 btn btn-lg text-white"
          style="font-weight: 400;background-color: indianred">Hard
        </button>
      </div>
      <div class="col-6 p-5">
        <div class="card shadow">
          <div>
            <b-table striped hover :items="items" :fields="fields"></b-table>
          </div>
          <table class="table table-striped">

            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(score,key) in scoreList" :key="key">
              <th scope="row"><img style="width: 50px" class="circle-img circle-img--small mr-2" alt="User Img"
                                   :src="checkBadgeImg(key)"></th>
              <td>{{ score.name }}</td>
              <td>{{ score.score }}</td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import DifficultyType from "@/models/DifficultyType";
import GameService from "@/services/GameService";

export default {
  name: "Home",
  computed: {
    DifficultyType() {
      return DifficultyType;
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const scoreList = ref([]);
    const one = "https://i.ibb.co/WWQWPms/first.png";
    const two = "https://i.ibb.co/fDdz3Jd/second.png";
    const three = "https://i.ibb.co/99XmYj0/third.png";
    const four = "https://i.ibb.co/f4nT6tm/four.png";
    const five = "https://i.ibb.co/qRg4fQF/five.png";
    const six = "https://i.ibb.co/6mtpm4x/six.png";
    const seven = "https://i.ibb.co/vVkWnWN/seven.png";
    const eight = "https://i.ibb.co/6rRgcNq/eight.png";
    const nine = "https://i.ibb.co/sH5dvW6/nine.png";

    const { currentUser } = store.getters;

    const difficultyLevel = computed(() => store.getters.difficultyLevel);

    const startGame = () => {
      router.push("play-game");
    };

    const goToMenuFunc = () => {
      router.push("menu");
    };

    const selectDifficulty = (difficultyLvl) => {
      console.log("difficulty level : ", difficultyLvl, difficultyLevel.value);
      store.dispatch("updateDifficultyLevel", difficultyLvl);
      router.push("play-game");
    };

    const getAllUsersWithScores = () => {
      GameService.getAllTopUsersWithScores().then((resp) => {
        console.log("current score", resp.data);
        scoreList.value = resp.data;
      });
    };

    const checkBadgeImg = (index) => {
      return index === 0 ? one : index === 1 ? two : index === 2 ? three : index === 3 ? four :index === 4 ? five :index === 5 ? six :index === 6 ? seven :index === 7 ? eight :index === 8 ? nine : "";
    };

    onMounted(() => {
      console.log("difficulty Level onMounted ", difficultyLevel.value);
      getAllUsersWithScores();
      if (difficultyLevel.value === null) {
        store.dispatch("updateDifficultyLevel", DifficultyType.EASY);
      }
    });

    return {
      currentUser,
      startGame,
      selectDifficulty,
      goToMenuFunc,
      scoreList,
      checkBadgeImg
    };
  }

};

</script>

<style scoped>
.background-set {
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