import mongoose, { Schema, Types } from "mongoose";

interface AnswerFormField extends Document {
    id: number;
    answer: string;
}

export interface FeedbackResponseFormat extends Document {
    id: number;
    questions: AnswerFormField[];
}

interface TemplateResponseInterface extends Document {
    template: any;
    authorId: string,
    authorName?: string,
    entityName: string,
    entityId: string;
    sectionResponse: FeedbackResponseFormat[];
}

const AnswerFormFieldSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    answer: {
        type: Schema.Types.Mixed,
        required: true
    },
}, { _id: false })


const FeedbackResponseFormatSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    questions: {
        type: [AnswerFormFieldSchema],
        default: [],
    },
}, { _id: false });


const TemplateResponseSchema: Schema = new Schema(
    {
        template: {
            type: Types.ObjectId,
            ref: 'FeedbackTemplate',
            required: true,
        },
        authorId: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: false,
        },
        entityId: { 
            type: String,
            required: true,
        },
        entityName: {
            type: String,
        },
        sectionResponse: {
            type: [FeedbackResponseFormatSchema],
            default: [],
        },
    },
    { timestamps: true, versionKey: false, }
);

const FeedbackTemplateResponse = mongoose.model<TemplateResponseInterface>('TemplateResponse', TemplateResponseSchema);

export default FeedbackTemplateResponse;

//example
const response = {
    customerId: '11111111',
    entityId: '111111111',
    entityName: '11111111111',
    customerName: 'amait',
    sectionResponse: [
        {
            id: 1,
            question: [
                {
                    id: 1,
                    answer: "Not good"
                }
            ]
        }
    ]
}