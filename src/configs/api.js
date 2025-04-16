import axios from "axios";
import { getNewTokens } from "services/token";
import { setCookie } from "src/utils/cookie";
import { getCookie } from "utils/cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
        request.headers["Authorization"] = `bearer ${accessToken}`
    }
    return request;
},
    (error) => {
        return Promise.reject(error);
    }
)



api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const orginalRequest = error.config;
        //console.log('orginal Request:', orginalRequest);
        if (error.response.status === 401 && !orginalRequest._retry) {
            orginalRequest._retry = true;

            const res = await getNewTokens();
            if (!res?.response) return;
            //console.log(res); // give me new access token and refresh token
            setCookie(res.response.data); 

            return api(orginalRequest);
        }
    }
)

export default api;