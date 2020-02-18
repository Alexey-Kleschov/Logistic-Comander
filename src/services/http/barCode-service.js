import axios from 'axios';
import { warehouseConfig } from '../../../serverConfig';

export default class BarcodeService { 

    getInvoiceFromWarehouse = (token, barCodePayload) => {

      const headers = {
        headers: {
          Authorization: token,
        },
      }; 

      return new Promise( (resolve, reject) => {
        axios
          .get(`${warehouseConfig}/ttnImportOrders/${barCodePayload}`, headers)
          .then( res => {
            resolve(res.data);
          })
      });
    }; 
 }