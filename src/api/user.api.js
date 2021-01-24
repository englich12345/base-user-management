const axios = require('axios');
const baseUrl = process.env.REACT_APP_BASE_URL

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