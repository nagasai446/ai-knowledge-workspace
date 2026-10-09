export interface User{
    id:number;
    email:string;
    is_active:boolean;
}

export interface LoginResponse{
    access_token : string;
    token_type : string;
    user : User;
}

export interface RegisterResponse{
    id : number;
    email : string;
    is_active : boolean;
}