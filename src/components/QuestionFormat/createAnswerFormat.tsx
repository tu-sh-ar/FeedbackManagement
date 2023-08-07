import React from 'react';
import CheckboxInput from '../input/checkbox-input'
import StarRating from '../input/star-rating';
import EmojiRating from '../input/emoji-rating';
import MultilineInput from '../input/multiline-input';
import RadioInput from '../input/radio-input';
import FileInput from '../input/file-input';
import { AnswerTypeInterface, OnChangeHandlerFn } from '@/pages/feedback-form/[feedback]';

interface AnswerFormat {
    type: string;
    options?: string[];
    required: boolean;
    upperBound?: number;
}

const FieldTypesMap: Record<
    string,
    {
        value: string;
        label: string;
        needsOptions?: boolean;
        isTextType?: boolean;
        needsUpperBound?: boolean;
        needTotalFilesLimit?: boolean;
        needPerFileSizeLimit?: boolean;
    }
> = {
    text: {
        label: "Short Text",
        value: "text",
        isTextType: true,
    },
    file: {
        label: "File",
        value: "file",
        needTotalFilesLimit: true,
        needPerFileSizeLimit: true,
    },
    number: {
        label: "Number",
        value: "number",
        isTextType: true,
    },
    starrating: {
        label: "Star Rating",
        value: "number",
        needsUpperBound: true,
    },
    numberrating: {
        label: "Number Rating",
        value: "number",
        needsUpperBound: true,
    },
    emojirating: {
        label: "Emoji Rating",
        value: "number",
        needsUpperBound: true,
    },
    textarea: {
        label: "Long Text",
        value: "textarea",
        isTextType: true,
    },
    select: {
        label: "Select",
        value: "select",
        needsOptions: true,
        isTextType: true,
    },
    multiselect: {
        label: "MultiSelect",
        value: "multiselect",
        needsOptions: true,
        isTextType: false,
    },
    radio: {
        label: "Radio",
        value: "radio",
        needsOptions: true,
        isTextType: false,
    },
    checkbox: {
        label: "Checkbox",
        value: "checkbox",
        needsOptions: true,
        isTextType: false,
    },
};

function Question({ question, required }: { question: string, required?: Boolean }) {
    return (
        <p className='text-[#000] pb-2'>
            <span className='mr-1'>•</span>
            {question}
            <span className='text-red-600 ml-1'>{required ? '*' : ''}</span>
        </p>
    )
}

export default function CreateAnswerFormat({ sectionId, questionId, question, answerFormat, onChange }: {
    sectionId: number;
    questionId: number;
    question: string;
    answerFormat: AnswerFormat;
    onChange: OnChangeHandlerFn;
}) {
    const { type, options, required, upperBound } = answerFormat;

    const onChangeHandler = (value: AnswerTypeInterface) => {
        onChange(sectionId, questionId, type, value)
    }

    switch (type) {
        case "checkbox":
            return <CheckboxInput
                text={question}
                onChange={onChangeHandler} />;

        case "starrating":
            return (
                <>
                    <Question question={question} required={required} />
                    <StarRating
                        count={upperBound ?? 5}
                        onChange={onChangeHandler} />
                </>
            );

        case "emojirating":
            return (
                <>
                    <Question question={question} required={required} />
                    <EmojiRating
                        count={upperBound ?? 5}
                        onChange={onChangeHandler} />
                </>
            );
        case "textarea":
            return (
                <>
                    <Question question={question} required={required} />
                    <MultilineInput
                        minRows={1}
                        onChange={onChangeHandler} />
                </>
            );
        case "radio":
            return (
                <>
                    <Question question={question} required={required} />
                    <RadioInput
                        options={options ?? []}
                        onChange={onChangeHandler} />
                </>
            );
        case "file":
            return (
                <>
                    <Question question={question} required={required} />
                    <FileInput onChange={onChangeHandler} />
                </>
            );
        default:
            return null;
    }
}