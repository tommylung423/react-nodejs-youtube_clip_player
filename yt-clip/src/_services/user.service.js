<<<<<<< HEAD
=======
import { authHeader } from '../_helpers';
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
import axios from "axios";

export const userService = {
    login,
    logout,
    register,
    
};
const API_URL = "http://localhost:8000/api";
<<<<<<< HEAD

=======
const axiosConfig = {
    headers: {
        'token':`${authHeader()}`,        
    }
  };
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
async function register(name,email, password) { 
    try {
        const res = await axios.post(`${API_URL}/users`, {name,email, password });
        console.log(res.data);
        localStorage.setItem('token', JSON.stringify(res.data.token));   

        return res.data.user;
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
};

async function login(email, password) {
    try {
        const res = await axios.post(`${API_URL}/auth`, {email, password });
        console.log(res.data.user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', JSON.stringify(res.data.token));
        return res.data.user;
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);

    }
    
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

