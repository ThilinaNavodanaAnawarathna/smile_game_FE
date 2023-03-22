import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";
import { BASE_API_URL } from "@/common/Constants";

const API_URL = "https://marcconrad.com/uob/smile/api.php";

const API_URL_MAIN = BASE_API_URL + "/api/score";

class GameService {

  callSmileAPI() {
    return axios.get(API_URL);
  }

  setScore(resultObj) {
    const req = axios.post(API_URL_MAIN, resultObj, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }

  getScore(id) {
    const url = API_URL_MAIN + "?userId=" + id;
    const req = axios.get(url, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }

  getAllUsersWithScores() {
    const url = API_URL_MAIN + "/all";
    const req = axios.get(url, { headers: authHeader() });

    return handleResponseWithLoginCheck(req);
  }
}

export default new GameService();