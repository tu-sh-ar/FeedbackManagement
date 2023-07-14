import mongoose, { Document, Schema, Types } from 'mongoose';
import { FieldTypes, TemplateType } from '../middlewares/enums/answerFormat_enum';

export interface AnswerFormat {
  type: string;
  required: boolean;
  options?: string[];
  upperBound?: number;
  activeStatus?: boolean;
}

export interface QuestionAnswerFormField {
  id: number;
  question: string;
  order: number;
  answerFormat: AnswerFormat[];
  activeStatus?: boolean;
}

export interface FeedbackFormat {
  id: number;
  title: string;
  order: number;
  fields?: QuestionAnswerFormField[];
  activeStatus?: boolean;
}

export interface IFeedbackTemplate extends Document {
  templateId: number;
  templateName: string;
  templateType: TemplateType;
  businessCategory: number;
  businessType: number;
  formats: FeedbackFormat[];
  businessAdminId: number;
  used: number;
  isActive: boolean;
}


const AnswerFormatSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
    enum: FieldTypes
  },
  required: {
    type: Boolean,
    required: true,
  },
  options: {
    type: [String],
    required: false,
    default: undefined
  },
  upperBound: {
    type: Number,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { _id: false, minimize: true })


const QuestionAnswerFormFieldSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  answerFormat: {
    type: [AnswerFormatSchema],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { _id: false })


const FeedbackFormatSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  fields: {
    type: [QuestionAnswerFormFieldSchema],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  }
}, { _id: false });


const FeedbackTemplateSchema: Schema = new Schema(
  {
    templateType: {
      type: Number,
      enum: [TemplateType.CUSTOM, TemplateType.DEFAULT],
      required: true,
    },
    templateName: {
      type: String,
      required: true,
    },
    businessCategory: { // ecommerce, food
      type: Number,
      required: false,
    },
    businessType: { // delivery, packing
      type: Number,
      required: true,
    },
    formats: {
      type: [FeedbackFormatSchema],
      default: [],
    },
    businessAdminId: {
      type: Number,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false
    },
    used: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false, }
);

const FeedbackTemplate = mongoose.model<IFeedbackTemplate>('FeedbackTemplate', FeedbackTemplateSchema);

export default FeedbackTemplate;
