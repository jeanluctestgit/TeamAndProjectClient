import axios from "axios";
import authHeader from './auth-header';
import jwt from 'jwt-decode' // import dependency
const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
  login(username, password) {
    console.log('-------------> login');
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        console.log(response.data);
        if (response.data.accessToken) {
          //const user = jwt(response.data.accessToken);
          const user = response.data;
          console.log(user);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return localStorage.getItem('user');
  }
}

export default new AuthService();