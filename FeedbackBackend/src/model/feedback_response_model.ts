// feedback response model when client makes a response 
import { Schema, Document, model, mongo, Types } from 'mongoose';

interface IFeedbackResponse extends Document {
  feedback_id: Types.ObjectId ;
  response: string;
  timestamp: Date;
}

const feedbackResponseSchema = new Schema<IFeedbackResponse>({
    feedback_id: {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
  },
  { versionKey:false },
);

const FeedbackResponse = model<IFeedbackResponse>('FeedbackResponse', feedbackResponseSchema);

export default FeedbackResponse;
