"use strict";
const template1Document = {
    templateType: 1,
    templateName: 'E-Commerce',
    businessCategory: 1,
    businessType: 1,
    formats: [
        {
            id: 1,
            title: 'Section 1 - Product',
            order: 1,
            fields: [
                {
                    id: 1,
                    question: 'How satisfied were you with the product?',
                    order: 1,
                    answerFormat: [
                        {
                            type: 'rating',
                            required: true
                        }
                    ]
                },
                {
                    id: 2,
                    question: 'Please update photo/video of the product',
                    order: 2,
                    answerFormat: [
                        {
                            type: 'file',
                            required: false
                        }
                    ]
                },
                {
                    id: 3,
                    question: 'Please describe your Experience',
                    order: 3,
                    answerFormat: [
                        {
                            type: 'textarea',
                            required: false
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Section 2 - Packaging',
            order: 2,
            fields: [
                {
                    id: 4,
                    question: 'How satisfied were you with the quality of the packaging materials used for your order?',
                    order: 1,
                    answerFormat: [
                        {
                            type: 'rating',
                            required: true
                        }
                    ]
                },
                {
                    id: 5,
                    question: 'Did the packaging adequately protect the contents of your package?',
                    order: 2,
                    answerFormat: [
                        {
                            type: 'radio',
                            options: ['Yes', 'No'],
                            required: true
                        }
                    ]
                },
                {
                    id: 6,
                    question: 'Did you feel that the packaging was appropriate for the type of product(s) ordered?',
                    order: 3,
                    answerFormat: [
                        {
                            type: 'radio',
                            options: ['Yes', 'No'],
                            required: true
                        }
                    ]
                },
                {
                    id: 7,
                    question: 'Were there any issues or concerns with the durability or strength of the packaging?',
                    order: 4,
                    answerFormat: [
                        {
                            type: 'radio',
                            options: ['Yes', 'No'],
                            required: true
                        },
                        {
                            type: 'textarea',
                            required: true,
                            dependsOn: {
                                questionId: 7,
                                option: 'Yes'
                            }
                        }
                    ]
                },
                {
                    id: 8,
                    question: 'Did the packaging include any excessive or unnecessary materials that could be reduced?',
                    order: 5,
                    answerFormat: [
                        {
                            type: 'radio',
                            options: ['Yes', 'No'],
                            required: true
                        },
                        {
                            type: 'textarea',
                            required: true,
                            dependsOn: {
                                questionId: 8,
                                option: 'Yes'
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: 'Section 3 - Overall Satisfaction',
            order: 3,
            fields: [
                {
                    id: 9,
                    question: 'Would you recommend the Product to others based on your experience?',
                    order: 1,
                    answerFormat: [
                        {
                            type: 'radio',
                            options: ['Yes', 'Maybe', 'No'],
                            required: true
                        }
                    ]
                },
                {
                    id: 10,
                    question: 'Is there anything specific you appreciated or think could be improved?',
                    order: 2,
                    answerFormat: [
                        {
                            type: 'radio',
                            options: ['Yes', 'No'],
                            required: true
                        },
                        {
                            type: 'textarea',
                            required: true,
                            dependsOn: {
                                questionId: 10,
                                option: 'Yes'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    businessAdminId: undefined,
    used: 0,
    isActive: false
};
const a = {
    "templateType": 1,
    "templateName": "E-Commerce",
    "businessCategory": 1,
    "businessType": 1,
    "formats": [
        {
            "id": 1,
            "title": "Section 1 - Product",
            "order": 1,
            "fields": [
                {
                    "id": 1,
                    "question": "How satisfied were you with the product?",
                    "order": 1,
                    "answerFormat": [
                        {
                            "type": "rating",
                            "required": true
                        }
                    ]
                },
                {
                    "id": 2,
                    "question": "Please update photo/video of the product",
                    "order": 2,
                    "answerFormat": [
                        {
                            "type": "file",
                            "required": false
                        }
                    ]
                },
                {
                    "id": 3,
                    "question": "Please describe your Experience",
                    "order": 3,
                    "answerFormat": [
                        {
                            "type": "textarea",
                            "required": false
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "title": "Section 2 - Packaging",
            "order": 2,
            "fields": [
                {
                    "id": 4,
                    "question": "How satisfied were you with the quality of the packaging materials used for your order?",
                    "order": 1,
                    "answerFormat": [
                        {
                            "type": "rating",
                            "required": true
                        }
                    ]
                },
                {
                    "id": 5,
                    "question": "Did the packaging adequately protect the contents of your package?",
                    "order": 2,
                    "answerFormat": [
                        {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        }
                    ]
                },
                {
                    "id": 6,
                    "question": "Did you feel that the packaging was appropriate for the type of product(s) ordered?",
                    "order": 3,
                    "answerFormat": [
                        {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        }
                    ]
                },
                {
                    "id": 7,
                    "question": "Were there any issues or concerns with the durability or strength of the packaging?",
                    "order": 4,
                    "answerFormat": [
                        {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        {
                            "type": "textarea",
                            "required": true,
                            "dependsOn": {
                                "questionId": 7,
                                "option": "Yes"
                            }
                        }
                    ]
                },
                {
                    "id": 8,
                    "question": "Did the packaging include any excessive or unnecessary materials that could be reduced?",
                    "order": 5,
                    "answerFormat": [
                        {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        {
                            "type": "textarea",
                            "required": true,
                            "dependsOn": {
                                "questionId": 8,
                                "option": "Yes"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "title": "Section 3 - Overall Satisfaction",
            "order": 3,
            "fields": [
                {
                    "id": 9,
                    "question": "Would you recommend the Product to others based on your experience?",
                    "order": 1,
                    "answerFormat": [
                        {
                            "type": "radio",
                            "options": ["Yes", "Maybe", "No"],
                            "required": true
                        }
                    ]
                },
                {
                    "id": 10,
                    "question": "Is there anything specific you appreciated or think could be improved?",
                    "order": 2,
                    "answerFormat": [
                        {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        {
                            "type": "textarea",
                            "required": true,
                            "dependsOn": {
                                "questionId": 10,
                                "option": "Yes"
                            }
                        }
                    ]
                }
            ]
        }
    ],
    "businessAdminId": null,
    "used": 0,
    "isActive": false
};
