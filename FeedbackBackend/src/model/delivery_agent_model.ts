import { Document, Schema, model } from 'mongoose';
import { type } from 'os';

interface IDeliveryAgent extends Document {
  user_id: string;
  deliveryagent_id: number;
  product_id: number;
  rating: number;
  comment: string;
  feedback_type:number,
  feedback_language:number
  }
  
  // Delivery Agent schema
  const deliveryAgentFeedbackSchema = new Schema<IDeliveryAgent>({
    deliveryagent_id: {type:Number} ,
    user_id: { type: String},
    product_id: { type:Number},
    rating:{type:Number, required:true},
    comment:{type:String, required:true},
    feedback_language:{type:Number},
    feedback_type:{type:Number}
  },
  {timestamps:true, versionKey:false});
  
  // Delivery Agent model
  const DeliveryAgentFeedback = model<IDeliveryAgent>('DeliveryAgentFeedbacks', deliveryAgentFeedbackSchema);

  export default DeliveryAgentFeedback