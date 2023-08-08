export interface Feedback {
  feedback_id: string;
  user_id: string;
  user_name: string;
  product_id: string;
  rating: number;
  comment: string;
  review: [];
  QA: { question: string; answer?: string }[];
  created_at: string;
  updated_at: string;
}

export interface PaginatedFeedbackResponse {
  feedbacks: Feedback[];
  currentPage: number;
  totalPages: number;
  totalFeedbacks: number;
}

export interface PostFeedbackResponse {
  feedback_id: string;
  response: string;
}

export interface GetFeedbackResponse {
  _id: string;
  feedback_id: string;
  response: string;
  timestamp: string;
}

export interface UpdateResponse {
  _id: string;
  feedback_id: string;
  response: string;
}

export interface CustomFeedbackFormBodySchema {
  feedbackFormName: string;
  businessCategory: number;
  feedbackType: string;
  sections: {
    title: string;
    order?: number;
    questions: {
      order?: number;
      question: string;
      answerFormat: {
        type: string;
        options?: string[];
        required: boolean;
        upperBound?: number;
      };
    }[];
  }[];
}

export interface BusinessSpecificFeedbackTemplatesDetails {
  response: {
    templates: {
      id: string;
      templateType: number;
      templateName: string;
      active: boolean;
      used: boolean
    }[];
    templateServiceCategory: {
      id: string;
      name: string;
    }
  }[];
  statusCode: number;
}

export interface SingleFeedbackTemplateBody {
  response: {
    id: string;
    templateName: string;
    active: boolean;
    feedbackType: string;
    businessCategory: number;
    templateType: number;
    sections: {
      id: string;
      title: string;
      order: number;
      questions: {
        id: number;
        order: number;
        question: string;
        answerFormat: {
          type: string;
          options?: string[];
          required: boolean;
          upperBound?: number;
        }
      }[]
    }[]
  };
  statusCode: number;
}

export interface CategoryBasedFeedbackTemplatesDetails {
  response: {
    templates:{
      id: string;
    templateType: number;
    templateName: string;
    active:boolean;
    used:boolean;
    }[];
    feedbackType: {
      id: string;
      name: string;
    }
  };
  statusCode: number;
}

export interface CategoryList{
  response:{
    id:string;
    name:string;
    businessCategoryId:number;
    creationType:number;
  }[];
  statusCode:number;
}

export interface EntitiesAssociatedWithCategory{
  response:{
    responseGroups:{
      entityId:string;
      entityName:string;
      count:number;
      isExpanded?:boolean;
    }[]
  };
  statusCode:number;
}

export interface FeedbacksAssociatedWithEntity{
  response:{
    data:{
      _id:string;
      authorId:string;
      authorName:string;
      entityName:string;
      createdAt:string;
    }[];
    totalResponses:number;
  };
  statusCode:number;
}

export interface DetailedFeedbackResponse{
  response:{
    authorId:number;
    authorName:string;
    entityId:string;
    entityName:string;
    templateName:string;
    templateResponse:{
      id:number;
      title:string;
      questionAnswer:{
        id:number;
        question:string;
        answerFormat:{
          type:string;
          required:boolean;
          options?:string[];
          upperbound?:string;
        };
        answer:any;
      }[];
    }[];
  };
  statusCode:number;
}