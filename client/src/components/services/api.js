import axios from 'axios';


const API_URL = 'https://backend-code-1-p7fb.onrender.com';

const API_GMAIL = async (urlObject, payload, type) =>{
    return await axios({
        method: urlObject.method,
        url:`${API_URL}/${urlObject.endpoint}/${type}`,
        data: payload
    });
}

export default API_GMAIL;