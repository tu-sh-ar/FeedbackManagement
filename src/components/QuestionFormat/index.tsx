import React from 'react'
import CreateAnswerFormat from './createAnswerFormat'
import { OnChangeHandlerFn } from '@/pages/feedback-form/[feedback]';

interface Question {
    id: number;
    question: string;
    answerFormat: {
        type: string;
        required: boolean;
        options?: string[];
        upperBound?: number;
    };
    order: number;
}

export default function QuestionFormat({ sectionId, questions, onChange }: 
    { sectionId: number, questions: Question[], onChange: OnChangeHandlerFn }) {

    return (
        questions.map((item, index) => (
            <div className='my-6 px-4' key={index}>
                <CreateAnswerFormat 
                    question={item.question}
                    sectionId={sectionId} 
                    questionId={item.id}
                    answerFormat={item.answerFormat}
                    onChange={onChange}/>
            </div>
        ))
    )
}