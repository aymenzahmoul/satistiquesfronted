import axios from "axios";

const API_BASE_URL = "/";

const AuthService = {
  signin: async (loginData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/signin`,
        loginData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}auth/user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  signup: async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}auth/signup`, userData);
        if (response.data.success) {
          return true ;
        } else {
          return false;
        }
       
    } catch (error) {
        throw error;
    }
},
  
 
};

export default AuthService;   