import axios from 'axios';
import { serverConfig } from '../../../serverConfig';

export default class BarcodeService { 

    getInvoiceFromWarehouse = (token, barCodePayload) => {

      const headers = {
        headers: {
          Authorization: token,
        },
      }; 

      return new Promise( (resolve, reject) => {
        axios
          .get(`${serverConfig}/ttnImportOrders/${barCodePayload}`, headers)
          .then( res => {
            resolve(res.data);
          })
      });
    }; 
 }