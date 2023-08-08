import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Feedback, PostFeedbackResponse, GetFeedbackResponse, UpdateResponse, PaginatedFeedbackResponse, CustomFeedbackFormBodySchema, SingleFeedbackTemplateBody, CategoryBasedFeedbackTemplatesDetails, BusinessSpecificFeedbackTemplatesDetails, CategoryList, EntitiesAssociatedWithCategory, FeedbacksAssociatedWithEntity, DetailedFeedbackResponse} from '../interfaces/feedback';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface DateRange {
  start:string;
  end:string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  baseURL:string = environment.feedbackApiUrl;

  getAllFeedbacks():Observable<Feedback[]>{
    return this._http.get<Feedback[]>(`${this.baseURL}feedback/getAllFeedbacks`)
  }

  //gets particular feedback based on feedback id
  getFeedbackById(feedbackId:string):Observable<Feedback>{
    return this._http.get<Feedback>(`${this.baseURL}feedback/${feedbackId}`)
  }

  //post response for particular feedback
  postResponse(feedbackResponseData:PostFeedbackResponse):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this._http.post<any>(`${this.baseURL}response`, JSON.stringify(feedbackResponseData), {'headers':headers});
  }

  //get response for particular feedback based on feedback id
  getResponse(feedbackId:string):Observable<GetFeedbackResponse>{
    return this._http.get<GetFeedbackResponse>(`${this.baseURL}response?feedback_id=${feedbackId}`)
  }

  //delete a response
  deleteResponse(responseId:string):Observable<Object> {
    return this._http.delete<Object>(`${this.baseURL}response/${responseId}`)
  }

  //update a response
  updateResponse(responseId:string, data:UpdateResponse):Observable<UpdateResponse>{
    return this._http.put<UpdateResponse>(`${this.baseURL}response/${responseId}`, data)
  }

  //retrieve all the templates details associated to particular business type
  getBusinessSpecificTemplateDetails():Observable<BusinessSpecificFeedbackTemplatesDetails>{
    return this._http.get<BusinessSpecificFeedbackTemplatesDetails>(`${this.baseURL}feedbackTemplate/getBusinessAdminTemplates`)
  }

  //create a custom template
  createCustomTemplate(data:CustomFeedbackFormBodySchema):Observable<CustomFeedbackFormBodySchema>{
    return this._http.post<CustomFeedbackFormBodySchema>(`${this.baseURL}feedbackTemplate/create`, data)
  }

  //get a unique template by template id
  getTemplateById(templateId:string):Observable<SingleFeedbackTemplateBody>{
    return this._http.get<SingleFeedbackTemplateBody>(`${this.baseURL}feedbackTemplate/getTemplateByIdAndBusinessAdmin/${templateId}`)
  }

  //get category specific templates details
  getCategoryBasedTemplateDetails(categoryId:string):Observable<CategoryBasedFeedbackTemplatesDetails>{
    return this._http.get<CategoryBasedFeedbackTemplatesDetails>(`${this.baseURL}feedbackTemplate/getTemplateByFeebackCategoryId/${categoryId}`);
  }

  //set a particular template as active
  setTemplateAsActive(feedbackTypeId:string, templateId:string):Observable<{message:string; status:number}>{
    return this._http.put<{message:string; status:number}>(`${this.baseURL}feedbackTemplate/activateTemplate/${feedbackTypeId}/${templateId}`, {})
  }

  //get category list for the particular business
  getCategoryList(businessCategoryId:number):Observable<CategoryList>{
    return this._http.get<CategoryList>(`${this.baseURL}serviceCategories/getServices/${businessCategoryId}`)
  }

  //get entities associated with a category
  getEntitiesAssociatedWithCategory(categoryId:string):Observable<EntitiesAssociatedWithCategory>{
    return this._http.get<EntitiesAssociatedWithCategory>(`${this.baseURL}templateResponse/getResponseBasedOnEntityId/${categoryId}`)
  }

  //get feedbacks associated with a entity
  getFeedbacksAssociatedWithEntity(entityId:string, pageNumber:number, pageSize:number):Observable<FeedbacksAssociatedWithEntity>{
    return this._http.get<FeedbacksAssociatedWithEntity>(`${this.baseURL}templateResponse/getResponsesOfEntity/${entityId}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  //get detailed feedback response for an entity based on response id
  getDetailedFeedbackResponse(responseId:string):Observable<DetailedFeedbackResponse>{
    return this._http.get<DetailedFeedbackResponse>(`${this.baseURL}templateResponse/getResponseById/${responseId}`)
  } 
  
}