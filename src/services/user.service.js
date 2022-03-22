import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = "http://localhost:8081/api";

class UserServices {
    getUsers()
    {
        return axios.get(BASE_URL + "/users");
    }
}

export default new UserServices();