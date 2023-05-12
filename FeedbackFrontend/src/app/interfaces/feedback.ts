export interface Feedback {
    id:number,
    user:{
        id:number,
        name:string,
        email:string
    },
    product:{
        id:number,
        product_name:string,
    },
    rating:number,
    comment:string,
    created_at:string,
    updated_at:string
}