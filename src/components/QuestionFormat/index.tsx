import React, { Dispatch } from 'react'
import CreateAnswerFormat from './createAnswerFormat'
import { ErrorProp, OnChangeHandlerFn } from '@/pages/feedback-form/[feedback]';

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

export default function QuestionFormat({ sectionId, questions, onChange, errors, setErrors }: 
    { 
        sectionId: number, 
        questions: Question[], 
        onChange: OnChangeHandlerFn,
        errors: ErrorProp,
        setErrors: Dispatch<React.SetStateAction<ErrorProp>> }) {

    return (
        questions.map((item, index) => (
            <div className='my-6 px-4' key={index}>
                <CreateAnswerFormat 
                    errors={errors}
                    question={item.question}
                    sectionId={sectionId} 
                    questionId={item.id}
                    answerFormat={item.answerFormat}
                    onChange={onChange}
                    setErrors={setErrors}/>
            </div>
        ))
    )
}