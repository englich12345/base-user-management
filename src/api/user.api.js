import { getUser } from '../common/localStorage'
const axios = require('axios');
const baseUrl = process.env.REACT_APP_BASE_URL

axios.interceptors.request.use(config => {
    let token = getUser("token")
    config.headers = Object.assign({
        Authorization: `${token}`
    }, config.headers)
    return config
});

export const getUserList = async () => {
    const url = baseUrl + "api/user"
    return axios.get(url)
        .catch(err => {
            console.log(err)
        })

}

export const register = async (params) => {
    const url = baseUrl + "api/user/register"
    const regParams = {
        name: params.name,
        email: params.email,
        role: params.role,
        password: params.password
    }
    console.log("regParams", regParams)
    try {
        return await axios.post(url, regParams);
    } catch (error) {
        console.log(error)
    }
}


export const login = async (params) => {
    const url = baseUrl + "api/user/login"
    const reqParams = {
        email: params.email,
        password: params.password
    }
    try {
        return await axios.post(url, reqParams);
    } catch (error) {
        console.log(error)
    }
}

