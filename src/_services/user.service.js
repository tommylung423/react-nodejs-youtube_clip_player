import axios from "axios";

export const userService = {
    login,
    logout,
    register,
    
};
// const API_URL = "http://localhost:8000/api";
const API_URL = "https://main-test-au-dyoyl6odci8iiu2c-gtw.qovery.io/api";

// const API_URL = "https://clip-nodejs.herokuapp.com/api";
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
    localStorage.clear();



}

