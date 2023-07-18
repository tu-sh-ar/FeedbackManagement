import * as yup from 'yup';

// Constant values
const UPPER_BOUND_TYPES = ['starrating', 'numberrating', 'emojirating']
const OPTIONS_TYPES = ['select', 'multiselect', 'radio', 'checkbox']
const MAX_FORMATS = 10;
const MAX_FIELDS = 20;
const MAX_QUESTION_LENGTH = 500;
const MAX_TITLE_LENGTH = 100;
const MAX_OPTIONS = 10;
const MAX_OPTION_LENGTH = 30;
const MAX_UPPER_BOUND = 100

// Error texts
const ERROR_FORMATS_MAX = `Formats array must not exceed ${MAX_FORMATS} items`;
const ERROR_FIELDS_MAX = `Fields array must not exceed ${MAX_FIELDS} items`;
const ERROR_QUESTION_REQUIRED = 'Question is required';
const ERROR_QUESTION_LENGTH = `Question must not exceed ${MAX_QUESTION_LENGTH} characters`;
const ERROR_ANSWER_FORMAT_REQUIRED = 'Answer format is required';
const ERROR_TITLE_REQUIRED = 'Title is required';
const ERROR_TITLE_LENGTH = `Title must not exceed ${MAX_TITLE_LENGTH} characters`;
const ERROR_DUPLICATE_OPTIONS = 'Duplicate options found';
const OPTIONS_REQUIRED = 'Options array must not be empty for this type format'
const ERROR_OPTIONS_REQUIRED = 'Options are required for this type format';
const ERROR_OPTIONS_LENGTH = `Options must not exceed ${MAX_OPTION_LENGTH} characters`;
const ERROR_OPTIONS_MAX = `Options array must not exceed ${MAX_OPTIONS} items`;
const ERROR_UNIQUE_TYPES = 'Duplicate answerFormat types found';
const ERROR_DUPLICATE_QUESTIONS = 'Duplicate questions found';
const ERROR_DUPLICATE_ORDERS = 'Duplicate orders found';
const ERROR_ORDER_CONTIGUOUS = 'Order values must be contiguous';
const ERROR_DUPLICATE_TITLES = 'Duplicate format titles found';
const ERROR_FORMAT_ORDER_CONTIGUOUS = 'Format order values must be contiguous';
const ERROR_NON_EMPTY_FORMATS = 'Formats array must not be empty';

// Schema definition
const formSchema = yup.object().shape({
    businessCategory: yup.number().required(),
    feedbackType: yup.string().required(),
    feedbackFormName: yup.string().max(MAX_QUESTION_LENGTH).required(ERROR_QUESTION_REQUIRED),
    sections: yup
        .array()
        .max(MAX_FORMATS, ERROR_FORMATS_MAX)
        .of(
            yup.object().shape({
                title: yup.string().max(MAX_TITLE_LENGTH).required(ERROR_TITLE_REQUIRED),
                order: yup.number().positive().required(ERROR_ORDER_CONTIGUOUS),
                fields: yup
                    .array()
                    .max(MAX_FIELDS, ERROR_FIELDS_MAX)
                    .of(
                        yup.object().shape({
                            question: yup.string()
                                .max(MAX_QUESTION_LENGTH)
                                .required(ERROR_QUESTION_REQUIRED),
                            answerFormat:
                                yup.object().shape({
                                    type: yup.string().max(20)
                                        .required(ERROR_ANSWER_FORMAT_REQUIRED),
                                    options: yup.array().when('type', {
                                        is: (type: string) =>
                                            OPTIONS_TYPES.includes(type),
                                        then: (value) => value
                                            .of(yup.string().max(MAX_OPTION_LENGTH).required(ERROR_OPTIONS_REQUIRED))
                                            .min(1, ERROR_OPTIONS_REQUIRED)
                                            .max(MAX_OPTIONS, ERROR_OPTIONS_MAX)
                                            .test('unique-options', ERROR_DUPLICATE_OPTIONS, function (options) {
                                                if (!options) {
                                                    return true;
                                                }
                                                const optionSet = new Set<string>();
                                                for (const option of options) {
                                                    if (optionSet.has(option)) {
                                                        return false;
                                                    }
                                                    optionSet.add(option);
                                                }
                                                return true;
                                            })
                                            .test('non-empty-options', OPTIONS_REQUIRED, function (options) {
                                                return options && options.length > 0;
                                            }),
                                    }),
                                    required: yup.boolean().required(),
                                    upperBound: yup
                                        .number()
                                        .min(0)
                                        .max(MAX_UPPER_BOUND)
                                        .when('type', {
                                            is: (type: string) =>
                                                UPPER_BOUND_TYPES.includes(type),
                                            then: (value) => value
                                                .positive()
                                                .required(),
                                        })
                                }).required(),
                            order: yup
                                .number()
                                .min(0).required(),
                        })
                    )
                    .test('unique-question', ERROR_DUPLICATE_QUESTIONS, function (fields) {
                        if (!fields) {
                            return true;
                        }
                        const questionSet = new Set<string>();
                        for (const field of fields) {
                            if (questionSet.has(field.question)) {
                                return false;
                            }
                            questionSet.add(field.question);
                        }
                        return true;
                    })
                    .test('unique-order', ERROR_DUPLICATE_ORDERS, function (fields) {
                        if (!fields) {
                            return true;
                        }
                        const orderSet = new Set<number>();
                        for (const field of fields) {
                            if (orderSet.has(field.order)) {
                                return false;
                            }
                            orderSet.add(field.order);
                        }
                        return true;
                    })
                    .test('contiguous-order', ERROR_ORDER_CONTIGUOUS, function (fields) {
                        if (!fields) {
                            return true;
                        }
                        const sortedOrders = fields.map((field) => field.order).sort((a, b) => a - b);
                        for (let i = 0; i < sortedOrders.length - 1; i++) {
                            if (sortedOrders[i + 1] !== sortedOrders[i] + 1) {
                                return false;
                            }
                        }
                        return true;
                    })
                    .required(),
            })
        )
        .test('unique-titles', ERROR_DUPLICATE_TITLES, function (formats) {
            if (!formats) {
                return true;
            }
            const titleSet = new Set<string>();
            for (const format of formats) {
                if (titleSet.has(format.title)) {
                    return false;
                }
                titleSet.add(format.title);
            }
            return true;
        })
        .test('contiguous-format-order', ERROR_FORMAT_ORDER_CONTIGUOUS, function (formats) {
            if (!formats) {
                return true;
            }
            const sortedOrders = formats.map((format) => format.order).sort((a, b) => a - b);
            for (let i = 0; i < sortedOrders.length - 1; i++) {
                if (sortedOrders[i + 1] !== sortedOrders[i] + 1) {
                    return false;
                }
            }
            return true;
        })
        .test('non-empty-formats', ERROR_NON_EMPTY_FORMATS, function (formats) {
            return formats && formats.length > 0;
        })
        .required(),
});

export const validateFormSchema = (data: any) => formSchema.validate(data);


const example = {
    "businessCategory": 1,
    "feedbackType": '64b14fe37d75d86fd1af82c1',
    "feedbackFormName": "E-commerce feedbacks",
    "sections": [
        {
            "title": "product",
            "order": 1,
            "fields": [
                {
                    "question": "How was the quality of product?",
                    "answerFormat": {
                        "type": "boolean",
                        "required": true
                    },
                    "order": 1
                },
                {
                    "question": "Was there any defects in product?",
                    "answerFormat": {
                        "type": "radio",
                        "options": ["options1", "options2", "options3"],
                        "required": true
                    },
                    "order": 2
                }
            ]
        },
        {
            "title": "packaging",
            "order": 2,
            "fields": [
                {
                    "question": "How was the packaging of the product?",
                    "answerFormat": {
                        "type": "starrating",
                        "upperBound": 10,
                        "required": false
                    },
                    "order": 1
                }
            ]
        },
        {
            "title": "delivery",
            "order": 3,
            "fields": [
                {
                    "question": "Was the delivery on-time?",
                    "answerFormat": {
                        "type": "boolean",
                        "required": false
                    },
                    "order": 1
                }
            ]
        }
    ]
}