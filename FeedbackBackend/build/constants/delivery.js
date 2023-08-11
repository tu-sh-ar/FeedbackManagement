"use strict";
const delivery = [
    {
        "templateName": "Default Template 3",
        "feedbackType": "64b155857d75d86fd1af82c3",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 1,
                "title": "Delivery Personnel",
                "order": 1,
                "questions": [
                    {
                        "id": 1,
                        "question": "How would you rate the professionalism and behavior of the delivery personnel?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 2,
                        "question": "Did they exhibit a friendly and courteous attitude during the delivery process?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 3,
                        "question": "Were any specific delivery instructions or requests addressed appropriately?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 3
                    }
                ]
            },
            {
                "id": 2,
                "title": "Timeliness and Punctuality",
                "order": 2,
                "questions": [
                    {
                        "id": 4,
                        "question": "How satisfied were you with the timeliness of the delivery service?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    }
                ]
            },
            {
                "id": 3,
                "title": "Communication and Updates",
                "order": 3,
                "questions": [
                    {
                        "id": 5,
                        "question": "How effective was the delivery service in providing timely and accurate updates about your delivery?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    }
                ]
            },
            {
                "id": 4,
                "title": "Delivery Process",
                "order": 4,
                "questions": [
                    {
                        "id": 6,
                        "question": "How would you rate the overall smoothness and efficiency of the delivery process for your order?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 7,
                        "question": "Were there any difficulties or issues encountered during the delivery process?",
                        "answerFormat": {
                            "type": "textarea",
                            "required": true
                        },
                        "order": 2
                    },
                ]
            },
            {
                "id": 5,
                "title": "Overall Satisfaction",
                "order": 5,
                "questions": [
                    {
                        "id": 9,
                        "question": "How satisfied were you with the delivery service?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 10,
                        "question": "Is there anything specific you appreciated or think could be improved about the delivery service?",
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
        "feedbackType": "64b155857d75d86fd1af82c3",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 6,
                "title": "Timeliness and Punctuality",
                "order": 1,
                "questions": [
                    {
                        "id": 11,
                        "question": "How satisfied were you with the timeliness of the delivery service?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Satisfied", "Punctual", "Quick", "Average", "Delayed", "Unsatisfied"],
                            "required": true
                        },
                        "order": 1
                    }
                ]
            },
            {
                "id": 7,
                "title": "Delivery Personnel",
                "order": 2,
                "questions": [
                    {
                        "id": 12,
                        "question": "How professional were the delivery personnel?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Highly professional.", "Extremely professional.", "Moderately professional.", "Somewhat professional.", "Not Professional"],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 13,
                        "question": "How would you rate their friendliness and courtesy during delivery?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 2
                    },
                    {
                        "id": 14,
                        "question": "How well were specific delivery instructions or requests handled?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Excellent", "Perfectly", "Exceptionally", "Poorly", "Unsatisfactorily"],
                            "required": true
                        },
                        "order": 3
                    }
                ]
            },
            {
                "id": 8,
                "title": "Delivery Process",
                "order": 3,
                "questions": [
                    {
                        "id": 15,
                        "question": "How smooth and efficient was the overall delivery process for your order?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Smooth", "Satisfactory.", "Good.", "Average.", "Problematic."],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 16,
                        "question": "Did you receive notifications or tracking information that kept you informed about the status of your package?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 2
                    }
                ]
            },
            {
                "id": 9,
                "title": "Overall contentment",
                "order": 4,
                "questions": [
                    {
                        "id": 17,
                        "question": "How satisfied were you with the delivery service?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Satisfied", "Excellent.", "Good.", "Unsatisfied", "Disappointed"],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 18,
                        "question": "Were there any particular areas of the delivery service that you feel could benefit from additional attention or improvements?",
                        "answerFormat": {
                            "type": "textarea",
                            "required": true
                        },
                        "order": 2
                    }
                ]
            }
        ]
    }
];
