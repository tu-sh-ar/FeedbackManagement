import { Schema, model, Document, Types, Date } from 'mongoose';

interface IFeedback extends Document {
  user_id: Types.ObjectId;
  deliveryagent_id: Types.ObjectId;
  client_id: Types.ObjectId;
  product_id: number;
  template_id: Types.ObjectId;
  rating: number;
  comment: string;
  feedback_type: string;
  feedback_language: string;
  additional_fields: Record<string, any>;
  qas: { question: string, answer?: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const QASchema = new Schema(
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

const FeedbackSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: 'User'
    },
    deliveryagent_id: {
      type: Number
    },
    client_id: {
      type:String
    },
    product_id: {
      type: Number,
      required: true,
    },
    template_id: {
      type: Types.ObjectId,
      ref: 'FeedbackTemplate',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    feedback_type: {
      type: String,
      required: true,
    },
    feedback_language: {
      type: String,
      required: true,
    },
    additional_fields: {
      type: Map,
      of: Schema.Types.Mixed,
    },
    qas: [QASchema],
  },
  { timestamps: true, versionKey: false }
);

const FeedbackModel = model<IFeedback>('Feedback', FeedbackSchema);

export default FeedbackModel;
