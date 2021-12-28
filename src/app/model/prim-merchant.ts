export interface Country {
    name?: string;
    code?: string;
}

export interface Users {
    email?:string;
    firstName?:string;
    lastName?:string;
    phone?:string;
    id?:string;
}


export interface PrimMerchant {
    id?: number;
    name?: number;
    image?: string;
    regdate?: string;
    bankadded?:boolean;
    status?:boolean;
    users?:Users[];
   
}