import { Answer, FeedbackFormBodySchema } from "@/pages/feedback-form/[feedback]";

export const transformTemplateToAnswer = (templateData: FeedbackFormBodySchema): Answer => {
    const answer: Answer = {
        sections: templateData.sections.map((section) => ({
            id: section.id,
            title: section.title,
            questions: section.questions.map((question) => ({
                id: question.id,
                question: question.question,
                answerFormat: question.answerFormat.type,
                required: question.answerFormat.required,
                answer: null,
            })),
        })),
    };

    return answer;
};

export function fetchSectionQuestionAnswers(data: Answer) {
    const result = data.sections.map((section) => {
        const { id, questions } = section;
        const filteredQuestions = questions
            .filter((question) => {
                if (typeof question.answer === 'string' && question.answer.trim() === '') {
                    return false; 
                }

                if (Array.isArray(question.answer) && question.answer.length === 0) {
                    return false; 
                }

                return question.answer !== null && question.answer !== undefined;
            })
            .map((question) => {
                const { id, answer } = question;
                return {
                    id,
                    answer,
                };
            });

        return {
            id,
            questions: filteredQuestions,
        };
    }).filter((section) => section.questions.length > 0);

    return result;
}