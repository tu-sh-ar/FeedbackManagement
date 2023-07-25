import { Document, Schema, model , Types} from 'mongoose';
import { answerFormat } from '../middlewares/enums/answerFormat_enum';
import { ObjectId } from 'mongodb';

interface IFeedbackQuestion {
  question: string;
  answer: string;
}

const QASchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
  },
  { _id: false }
);

interface IDeliveryAgent extends Document {
  template_id: ObjectId;
  user_id: string;
  deliveryagent_id: number;
  product_id: number;
  rating: number;
  comment: string;
  qas: IFeedbackQuestion[];
  }
  
  // Delivery Agent schema
  const deliveryAgentFeedbackSchema = new Schema<IDeliveryAgent>({
    template_id: {
      type: Types.ObjectId,
      ref: 'FeedbackTemplate',
      required: true,
    },
    deliveryagent_id: {
      type:Number,
      required:true
    },
    user_id: {
       type: String,
       required:true
      },
    product_id: { 
      type:Number
    },
    rating:{
      type:Number, 
      required:true
    },
    comment:{
      type:String
    },
    qas: {
      type: [QASchema],
    },
  },
  {timestamps:true, versionKey:false});
  
  // Delivery Agent model
  const DeliveryAgentFeedback = model<IDeliveryAgent>('DeliveryAgentFeedbacks', deliveryAgentFeedbackSchema);

  export default DeliveryAgentFeedback