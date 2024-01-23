import axios from "axios";

const API_BASE_URL = "/";

const Livestats2 = {
  getLivestats2: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}livestats2`, {
        withCredentials: true,
      });
       // Corrected line
      return response.data;
      
    } catch (error) {
      throw error;
    }
  },
};

export default Livestats2;
