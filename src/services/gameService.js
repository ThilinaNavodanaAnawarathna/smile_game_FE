import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "@/services/BaseService";
import { BASE_API_URL } from "@/common/Constants";

const SMILE_API_URL = "https://marcconrad.com/uob/smile/api.php";

const API_URL_MAIN = BASE_API_URL + "/api/score";

class GameService {

  getQuestion() {
    return axios.get(SMILE_API_URL);
  }

  setUserScore(resultObj) {
    const req = axios.post(API_URL_MAIN, resultObj, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }

  getUserScore(id) {
    const url = API_URL_MAIN + "?userId=" + id;
    const req = axios.get(url, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }

  getAllTopUsersWithScores() {
    const url = API_URL_MAIN + "/top_players";
    const req = axios.get(url, { headers: authHeader() });

    return handleResponseWithLoginCheck(req);
  }
}

export default new GameService();