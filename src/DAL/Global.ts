import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

export const instance = axiosRateLimit( axios.create({
     baseURL:'https://neko-back.herokuapp.com/2.0',
    //baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
}),{maxRequests:1,perMilliseconds:3000,maxRPS:1})