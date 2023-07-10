import mongoose, { Document, Schema , Types } from 'mongoose';
import { CategoryType } from '../middlewares/enums/buisness_category_enum';
import { TemplateType } from '../middlewares/enums/template_type';
import { answerFormat } from '../middlewares/enums/answerFormat_enum';
import { ObjectId } from 'mongodb';

interface IFeedbackQuestion {
  question: string;
  answerFormat: answerFormat;
}

interface IFeedbackTemplate extends Document {
  template_type: TemplateType;
  categoryTemplate_id: Types.ObjectId;
  business_type: CategoryType;
  requiredFields: Record<string, boolean>;
  qas: IFeedbackQuestion[];
  client_id: number;
  isActive:Boolean;
}

const FeedbackQuestionSchema: Schema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answerFormat: {
    type: String,
    required: true,
    enum:Object.values(answerFormat)
  },
},
{_id:false}
);

const FeedbackTemplateSchema: Schema = new Schema(
  {
    template_type: {
      type: String,
      required: true,
      enum: Object.values(TemplateType)
    },
    template_id: {
      type: Types.ObjectId,
      ref: 'FeedbackCategoryTemplates',
      required: true,
    },
    business_type: {
      type: String,
      required: true,
      enum: Object.values(CategoryType)
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
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true, versionKey: false }
);

const FeedbackTemplate = mongoose.model<IFeedbackTemplate>('FeedbackTemplate', FeedbackTemplateSchema);

export default FeedbackTemplate;
