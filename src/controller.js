import axios from 'axios';

export const BACKEND_URL = "http://localhost:3000";

export const handleLogin = async (email, password) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
            email,
            password
        })
        if(response.status === 200){
            localStorage.setItem("auth",response.data.data.accessToken)
            return response.data.data
        } else {
            throw response.data.msg
        }
    } catch (err) {
        return err
    }
}

export const handleSignup = async (email, password) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
            email,
            password
        })
        if(response.status === 200){
            localStorage.setItem("auth",response.data.data.accessToken)
            return response.data.data
        } else {
            throw response.data.msg
        }
    } catch (err) {
        return err
    }
}

export const handleLogout = async (email, password) => {
    try {
        localStorage.clear("auth")
    } catch (err) {
        return err
    }
}