import axios from "axios";

const API_BASE_URL = "/";

const SumData = {
  getLivestatByIdandDate: async (date1, date2) => {
    try {
      const response = await axios.get(`${API_BASE_URL}SumData`, {
        params: {
          date1,
          date2
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default SumData;
