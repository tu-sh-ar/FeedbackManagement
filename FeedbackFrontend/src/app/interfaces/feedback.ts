export interface Feedback {
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