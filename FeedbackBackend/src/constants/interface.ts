export interface FeedbackFormBodySchema {
    businessCategory?: number;
    feedbackType: number;
    feedbackFormName: string;
    sections: {
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