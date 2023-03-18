import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";

const API_URL = BASE_API_URL + "/api/device";

class DeviceService {

  saveDevice(device) {
    const req = axios.post(API_URL, device, { headers: authHeader() });

    return handleResponseWithLoginCheck(req);
  }

  deleteDevice(deviceId) {
    const req = axios.delete(API_URL + "/" + deviceId, { headers: authHeader() });

    return handleResponseWithLoginCheck(req);
  }

  getAllDevices() {
    return axios.get(API_URL);
  }

}

export default new DeviceService();