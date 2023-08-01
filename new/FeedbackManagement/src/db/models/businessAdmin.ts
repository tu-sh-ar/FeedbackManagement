import mongoose, { Schema, Types } from "mongoose";

export interface BusinessTemplate {
    id: Types.ObjectId;
    active: boolean;
    used: boolean;
    lastActivatedTimestamp: Date;
}

interface BusinessAdmin extends Document {
    busniessAdminId: number;
    templateServiceCategoryId: Types.ObjectId;
    templates: BusinessTemplate[]
}

const templateSchema: Schema = new Schema({
    id: {
        type: Types.ObjectId,
        ref: 'FeedbackTemplate',
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    },
    lastActivatedTimestamp: {
        type: Date,
        required: false
    },
}, { _id: false })


const BusinessAdminSchema: Schema = new Schema(
    {
        businessAdminId: {
            type: Number,
            required: true,
        },

        templateServiceCategoryId: {
            type: Types.ObjectId,
            ref: 'FeedbackCategories',
            required: true,
        },

        templates: {
            type: [templateSchema],
            default: [],
        }
    },
    { timestamps: true, versionKey: false, }
);

export const BusinessAdmin = mongoose.model<BusinessAdmin>('BusinessAdmin', BusinessAdminSchema);
