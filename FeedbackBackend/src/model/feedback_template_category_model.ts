import mongoose, { Document, Schema } from 'mongoose';
import { CategoryType } from '../middlewares/enums/buisness_category_enum';
import { TemplateType } from '../middlewares/enums/template_type';
import { answerFormat } from '../middlewares/enums/answerFormat_enum';

interface IFeedbackQuestion {
  question: string;
  answerFormat: answerFormat;
}

interface IFeedbackTemplate extends Document {
  business_category_type: CategoryType;
  template_type: TemplateType;
  requiredFields: Record<string, boolean>;
  qas: Record<string, IFeedbackQuestion[]>;
}

const FeedbackQuestionSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answerFormat: {
      type: String,
      required: true,
      enum: Object.values(answerFormat)
    },
  },
  { _id: false }
);

const FeedbackCategoryTemplateSchema: Schema = new Schema(
  {
    business_category_type: {
      type: String,
      required: true,
      enum: Object.values(CategoryType),
    },
    template_type:{
      type:String,
      required:true,
      enum:Object.values(TemplateType)
    },
    requiredFields: {
      type: Map,
      of: Boolean,
    },
    qas: {
      type: Map,
      of: [FeedbackQuestionSchema]
    },
  },
  { timestamps: true, versionKey: false }
);

const FeedbackCategoryTemplates = mongoose.model<IFeedbackTemplate>(
  'FeedbackCategoryTemplates',
  FeedbackCategoryTemplateSchema
);

export default FeedbackCategoryTemplates;
