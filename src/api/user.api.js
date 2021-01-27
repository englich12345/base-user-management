import axios from 'axios'


export const getUserList = async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const url = baseUrl + "api/user"
    return axios.get(url)
    .catch(err=>{
        console.log(err)
    })

}
