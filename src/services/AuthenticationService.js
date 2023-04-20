import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";

const API_URL = BASE_API_URL + "/api/authentication";

class AuthenticationService {

  signIn(user) {
    return axios.post(API_URL + "/sign-in", user);
  }

  singUp(user) {
    return axios.post(API_URL + "/sign-up", user);
  }
}

export default new AuthenticationService();