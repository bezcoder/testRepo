import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimMerchant } from '../../model/prim-merchant';



@Injectable()
export class PrimMerchantService {
    constructor(private http: HttpClient) { }

    getCustomersLarge() {
        return this.http.get<any>('assets/primmerchant.json')
            .toPromise()
            .then(res => <PrimMerchant[]>res.data)
            .then(data => { return data; });
    }
}
