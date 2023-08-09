"use strict";
const templates1 = [
    {
        "templateName": "Default Template 3",
        "feedbackType": "64b14fe37d75d86fd1af82c1",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 1,
                "title": "Product",
                "order": 1,
                "questions": [
                    {
                        "id": 1,
                        "question": "How satisfied were you with the product?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": false,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 2,
                        "question": "Please update photo/video of the product",
                        "answerFormat": {
                            "type": "file",
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 3,
                        "question": "Please describe your Experience",
                        "answerFormat": {
                            "type": "textarea",
                            "required": true
                        },
                        "order": 3
                    }
                ]
            },
            {
                "id": 2,
                "title": "Packaging",
                "order": 2,
                "questions": [
                    {
                        "id": 4,
                        "question": "How satisfied were you with the quality of the packaging materials used for your order?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": false,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 5,
                        "question": "Did the packaging adequately protect the contents of your package?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 6,
                        "question": "Did you feel that the packaging was appropriate for the type of product(s) ordered?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 3
                    },
                    {
                        "id": 7,
                        "question": "Were there any issues or concerns with the durability or strength of the packaging?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 4
                    },
                    {
                        "id": 8,
                        "question": "Did the packaging include any excessive or unnecessary materials that could be reduced?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 5
                    }
                ]
            },
            {
                "id": 3,
                "title": "Overall Satisfaction",
                "order": 3,
                "questions": [
                    {
                        "id": 9,
                        "question": "Would you recommend the Product to others based on your experience?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "Maybe", "No"],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 10,
                        "question": "Is there anything specific you appreciated or think could be improved?",
                        "answerFormat": {
                            "type": "textarea",
                            "required": true
                        },
                        "order": 2
                    }
                ]
            }
        ]
    },
    {
        "templateName": "Default Template 4",
        "feedbackType": "64b14fe37d75d86fd1af82c1",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 1,
                "title": "Product",
                "order": 1,
                "questions": [
                    {
                        "id": 1,
                        "question": "How do you rate our product? (Rating)",
                        "answerFormat": {
                            "type": "starrating",
                            "required": false,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 2,
                        "question": "Please share photo/video of the product",
                        "answerFormat": {
                            "type": "file",
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 3,
                        "question": "Please share your review for the product",
                        "answerFormat": {
                            "type": "textarea",
                            "required": true
                        },
                        "order": 3
                    }
                ]
            },
            {
                "id": 2,
                "title": "Packaging",
                "order": 2,
                "questions": [
                    {
                        "id": 4,
                        "question": "How satisfied were you with the quality of the packaging materials used for your order?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Satisfied", "Excellent", "Good", "Average", "Not Satisfied"],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 5,
                        "question": "How good was the packaging to protect the contents of your package?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Excellent", "Good", "Average", "Bad"],
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 6,
                        "question": "Did you experience any issues or damage to the contents of your order due to packaging concerns?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 3
                    },
                    {
                        "id": 7,
                        "question": "Was the packaging environmentally friendly or made from sustainable materials?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 4
                    }
                ]
            },
            {
                "id": 3,
                "title": "Suggestion",
                "order": 3,
                "questions": [
                    {
                        "id": 8,
                        "question": "Do you have any feedback on the overall experience of using the service and any suggestions for improvement?",
                        "answerFormat": {
                            "type": "textarea",
                            "required": true
                        },
                        "order": 1
                    },
                ]
            }
        ]
    }
];
