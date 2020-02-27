import axios from 'axios';
import { cargoConfig } from '../../../serverConfig';

export const getDriverOrders = (token, id) => {   
    const headers = {
        headers: {
            'access-token': token
        },
    }; 

    return new Promise( (resolve) => {
        axios
            .get(`${cargoConfig}ttn/all-drivers-ttn?driverId=${id}`, headers)
            .then( res => {
                resolve(res.data);
            })
            .catch(err => console.log(err))
    });

}; 
 