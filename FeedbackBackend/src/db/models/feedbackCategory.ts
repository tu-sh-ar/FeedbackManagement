import mongoose, { Document, Schema, } from 'mongoose';
import { TemplateType } from '../../constants/constants';

export interface FeedbackServiceCategoryInterface extends Document {
    name: string;
    creationType: TemplateType;
    businessCategoryId: number;
    businessAdminId?: number;
}

const FeedbackCategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        creationType: {
            type: Number,
            enum: [TemplateType.CUSTOM, TemplateType.DEFAULT],
            required: true,
        },

        businessCategoryId: {
            type: Number,
            required: true,
        },

        businessAdminId: {
            type: Number,
            required: false,
        },
        
    },
    { timestamps: true, versionKey: false, }
);

const FeedbackCategory = mongoose.model<FeedbackServiceCategoryInterface>('FeedbackCategories',
    FeedbackCategorySchema);

export default FeedbackCategory;