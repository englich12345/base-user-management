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
// export 


export const register = async (params) => {
    const url = baseUrl + "api/user/register"
    const reqParams = {
        name: params.name,
        email: params.email,
        role: params.role,
        password: params.password
    }
    return await axios.post(url, reqParams);
}
export const Deleting = async(id)=>{
    const url=baseUrl+`api/user/${id}`
    return await axios.delete(url)
}
export const update = async (id, params) => {
    // api​/user​/:id tức là truyền id lên url, 
    // const url = baseUrl + `api/user/update/${id}` // api bị sai
    //------ vì sao _id bên kia bên ni thì rứa  
    //---vì sao role admin mới sửa đc, đáng kẻ role admin sửa hết mọi người chơ?
    //vì sao role:admin không thể đăng kí/ how ?
    //role ở edit k nhảy
    
    const url = baseUrl + `api/user/${id}`// ----vì răng lại id và params
    
    const reqParams = {
        name: params.name,
        email: params.email,
        role: params.role,
        password: params.password
    }
    return await axios.put(url, reqParams);

}
export const getUserById = async (id) => {
    const url = baseUrl + `api/user/${id}`
    return axios.get(url)
}


export const login = async (params) => {
    const url = baseUrl + "api/user/login"
    const reqParams = {
        email: params.email,
        password: params.password
    }
    return await axios.post(url, reqParams);
}