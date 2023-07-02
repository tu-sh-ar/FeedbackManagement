export interface Feedback {
    feedback_id:string;
    user_id:string;
    product_id:string;
    rating:number;
    comment:string;
    review:[];
    QA:[];
    created_at:string;
    updated_at:string;
}

export interface PaginatedFeedbackResponse {
    feedbacks: Feedback[];
    currentPage:number;
    totalPages:number;
    totalFeedbacks:number;
}

export interface PostFeedbackResponse {
    feedback_id:string;
    response:string;
}

export interface GetFeedbackResponse {
    _id:string;
    feedback_id:string;
    response:string;
    timestamp:string;
}

export interface UpdateResponse {
    _id:string;
    feedback_id:string;
    response:string;
}