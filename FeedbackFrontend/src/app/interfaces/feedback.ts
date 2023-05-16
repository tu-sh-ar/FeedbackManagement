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

export interface FeedbackRes {
    feedback_id:string,
    user_id:string,
    product_id:string,
    rating:number,
    comment:string,
    review:{},
    QA:{},
    created_at:string,
    updated_at:string
}