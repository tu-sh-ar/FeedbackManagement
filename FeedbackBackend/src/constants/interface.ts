export interface FeedbackFormBodySchema {
    businessCategory?: number;
    businessType: number;
    feedbackFormName: string;
    formats: {
        title: string;
        order: number;
        fields: {
            question: string;
            answerFormat: {
                type: string;
                options?: string[];
                required: boolean;
                upperBound?: number;
            }[];
            order: number;
        }[];
    }[];
}