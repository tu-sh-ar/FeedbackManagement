import mongoose, { Document, Schema } from 'mongoose';

interface IFeedbackTemplate extends Document {
  type: string;
  fields: Record<string, string>;
  requiredFields: Record<string, boolean>;
  qas: Record<string, { question: string; answer: string; answerFormat: string }>;
  client_id: string;
}

const FeedbackTemplateSchema: Schema = new Schema(
  {
    type: {
      type: Number,
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
      type: Map,
      of: new Schema(
        {
          question: {
            type: String,
            required: true,
          },
          answerFormat: {
            type: String,
            required: true,
          },
        },
        { _id: false }
      ),
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
