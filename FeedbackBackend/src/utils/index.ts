import jwt from 'jsonwebtoken';
import { auth_constant, feedbackFormUrl } from '../constants/constants';
import { LinkBodyDto, SectionResponse, sectionInterface } from '../types/feedback';
import path from 'path';
import crypto from 'crypto'
import { FeedbackFormat } from '../db/models/template';
import { FeedbackResponseFormat } from '../db/models/feedbackResponse';


export function areContiguousIntegersStartingFromOne(numbers: number[]): boolean {
    if (numbers.length === 0) {
        return false;
    }

    const sortedNumbers = numbers.slice().sort((a, b) => a - b);

    if (sortedNumbers[0] !== 1) {
        return false;
    }

    for (let i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] - sortedNumbers[i - 1] !== 1) {
            return false;
        }
    }

    return true;
}

export function generateUrlWithToken(templateId: string, linkBodyDto: LinkBodyDto) {
    const payload = {
        templateId: templateId,
        linkBodyDto
    };

    const secretKey = auth_constant.secret;

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    const baseUrl = feedbackFormUrl;
    const urlWithToken = `${baseUrl}/${token}`;

    return urlWithToken;
}


export function generateUniqueFileName(originalFileName: string) {
    const fileExtension = path.extname(originalFileName);

    const randomString = crypto.randomBytes(3).toString('hex');
    const timestamp = new Date().getTime();

    const uniqueName = `${path.basename(originalFileName, fileExtension)}_${randomString}_${timestamp}${fileExtension}`;

    return uniqueName;
}


export function mapQuestionResponses(templateSections: FeedbackFormat[], sectionResponse: FeedbackResponseFormat[]): any[] {
    return templateSections.map((section) => {
        const sectionResponseItem = sectionResponse.find((item) => item.id === section.id);
        if (sectionResponseItem) {
            return {
                id: section.id,
                title: section.title,
                questionAnswer: section.questions.map((question) => {
                    const responseQuestion = sectionResponseItem.questions.find((q) => q.id === question.id);
                    return {
                        id: question.id,
                        answerFormat: question.answerFormat,
                        answer: responseQuestion ? responseQuestion.answer : null,
                    };
                }),
            };
        } else {
            return {
                id: section.id,
                title: section.title,
                questionAnswer: section.questions.map((question) => ({
                    id: question.id,
                    question: question.question,
                    answerFormat: question.answerFormat,
                    answer: null,
                })),
            };
        }
    });
}