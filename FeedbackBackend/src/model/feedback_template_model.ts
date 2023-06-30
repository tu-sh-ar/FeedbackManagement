import mongoose, { Document, Schema } from 'mongoose';

interface IFeedbackQuestion {
  question: string;
  answerFormat: string;
}

interface IFeedbackTemplate extends Document {
  type: string;
  fields: Record<string, string>;
  requiredFields: Record<string, boolean>;
  qas: IFeedbackQuestion[];
  client_id: string;
}

const FeedbackQuestionSchema: Schema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answerFormat: {
    type: String,
    required: true,
  },
},
{_id:false}
);

const FeedbackTemplateSchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    fields: {
      type: Map,
      of: String,
    },
    requiredFields: {
      type: Map,
      of: Boolean,
    },
    qas: {
      type: [FeedbackQuestionSchema],
      default: [],
    },
    client_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const FeedbackTemplate = mongoose.model<IFeedbackTemplate>('FeedbackTemplate', FeedbackTemplateSchema);

export default FeedbackTemplate;
