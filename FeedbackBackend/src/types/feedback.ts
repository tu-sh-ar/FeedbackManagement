export interface FeedbackFormBodySchema {
    businessCategory?: number;
    feedbackType: string;
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


interface AnswerDTO {
    id: number;
    answer: string;
}

interface QuestionDTO {
    id: number;
    answers: AnswerDTO[];
}

interface SectionDTO {
    id: number;
    questions: QuestionDTO[];
}

export interface TemplateResponseDTO {
    authorId: string;
    entityId: string;
    entityName: string;
    authorName?: string;
    sectionResponse: SectionDTO[];
}


export interface BusinessAdminInterface {
    businessAdminId: number;
    businessCategory: number
}

export interface LinkBodyDto {
    authorId: string;
    entityId: string;
    entityName: string;
    authorName?: string;
}