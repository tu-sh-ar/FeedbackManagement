"use strict";
/**
 * @description
 * These are the default templates created by the super admin
 * and these will be helping for adding/pushing templates data to DB
 */
const customer = [
    {
        "templateName": "Default Template 3",
        "feedbackType": "64b156357d75d86fd1af82c5",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 1,
                "title": "Customer Service",
                "order": 1,
                "questions": [
                    {
                        "id": 1,
                        "question": "How satisfied were you with the responsiveness of the customer support team?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Satisfied", "Quick", "Slow", "Dissatisfied", "Unresponsive", "Delayed"],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 2,
                        "question": "Were you satisfied with the level of knowledge and expertise demonstrated by the customer support representatives?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 3,
                        "question": "Were there any instances where the customer support team went above and beyond to assist you?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 3
                    },
                    {
                        "id": 4,
                        "question": "How would you rate the friendliness and professionalism of the customer support representatives?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 4
                    },
                    {
                        "id": 5,
                        "question": "Were you able to easily reach the customer support team through your preferred communication channels (e.g., phone, email, live chat)?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 5
                    },
                    {
                        "id": 6,
                        "question": "Were your concerns or issues effectively resolved by the customer support team?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 6
                    }
                ]
            },
            {
                "id": 2,
                "title": "Overall Satisfaction",
                "order": 2,
                "questions": [
                    {
                        "id": 7,
                        "question": "Overall, how satisfied were you with the customer support experience provided by the ecommerce platform?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    }
                ]
            }
        ]
    },
    {
        "templateName": "Deafult Template 4",
        "feedbackType": "64b156357d75d86fd1af82c5",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 3,
                "title": "Customer Service",
                "order": 1,
                "questions": [
                    {
                        "id": 8,
                        "question": "How satisfied were you with the responsiveness of the customer support team?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 9,
                        "question": "Did the customer support team address your inquiries and concerns in a timely manner?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 10,
                        "question": "How would you rate the overall helpfulness and effectiveness of the customer support team?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 3
                    },
                    {
                        "id": 11,
                        "question": "Were there any instances where the customer support team went above and beyond to assist you?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 4
                    },
                    {
                        "id": 13,
                        "question": "Did the customer support team provide clear and accurate information to resolve your issues or answer your questions?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 6
                    },
                    {
                        "id": 14,
                        "question": "How satisfied were you with the customer support team's resolution of your concerns or issues?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Satisfied", "Good", "Average", "Disappointed", "Unsatisfied"],
                            "required": true
                        },
                        "order": 7
                    }
                ]
            },
            {
                "id": 4,
                "title": "Overall Satisfaction",
                "order": 2,
                "questions": [
                    {
                        "id": 15,
                        "question": "Overall, how satisfied were you with the customer support experience provided by the ecommerce platform?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    }
                ]
            }
        ]
    }
];
