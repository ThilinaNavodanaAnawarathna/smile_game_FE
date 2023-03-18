import axios from "axios";

const API_URL = "https://marcconrad.com/uob/smile/api.php";

class GameService {

  callSmileAPI() {
    return axios.get(API_URL);
  }
}

export default new GameService();