import axios from "axios";

const API_BASE_URL = "/";

const LivestatsService = {
  getLivestats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}livestats`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  checkBackend: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}livestats`, {
        withCredentials: true,
      });
      
      if (response.status === 200) {
        console.log(response.status);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
};

export default LivestatsService;
