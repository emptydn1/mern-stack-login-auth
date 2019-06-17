import axios from 'axios';
import * as Config from '../constants/Config';

export default function callApi(endPoint, method = 'GET', body) {
    return axios({
        method,
        url: `${Config.API_URL}/${endPoint}`,
        data: body
    })
}