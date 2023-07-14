import mongoose, { Document, Schema, } from 'mongoose';

export interface IFeedbackCaregory extends Document {
    name: string;
    businessAdminId: number;
}

const FeedbackCategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false, }
);

const FeedbackCategory = mongoose.model<IFeedbackCaregory>('FeedbackCategory', 
    FeedbackCategorySchema);
export default FeedbackCategory;
