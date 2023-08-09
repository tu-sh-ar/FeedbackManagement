/**
 * @description
 * These are the default templates created by the super admin
 * and these will be helping for adding/pushing templates data to DB  
 */

const seller = [
    {
        "templateName": "Default Template 3",
        "feedbackType": "64d3379d2694ce6e275c1bbd",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 1,
                "title": "Vendor Feedback",
                "order": 1,
                "questions": [
                    {
                        "id": 1,
                        "question": "How would you rate the quality of the products or services provided by the vendor?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 2,
                        "question": "Were the products or services delivered on time and in good condition?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 3,
                        "question": "Did the vendor meet your expectations in terms of product variety and availability?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 3
                    },
                    {
                        "id": 4,
                        "question": "How would you rate the vendor's pricing compared to other options in the market?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 4
                    },
                    {
                        "id": 5,
                        "question": "Did the vendor provide accurate and detailed product descriptions and specifications?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 5
                    },
                    {
                        "id": 6,
                        "question": "How likely are you to continue doing business with this vendor in the future?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Likely", "Highly", "Maybe", "Unlikely", "Doubtful"],
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
                        "question": "Would you recommend this vendor to others based on your experience?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "Maybe", "No"],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 8,
                        "question": "Were there any particular areas of the delivery service that you feel could benefit from additional attention or improvements?",
                        "answerFormat": {
                            "type": "textarea",
                            "required": true
                        },
                        "order": 2
                    },
                ]
            }
        ]
    },
    {
        "templateName": "Default Template 4",
        "feedbackType": "64d3379d2694ce6e275c1bbd",
        "businessCategory": 1,
        "templateType": 2,
        "sections": [
            {
                "id": 3,
                "title": "Vendor Feedback",
                "order": 1,
                "questions": [
                    {
                        "id": 10,
                        "question": "How would you rate the quality of the products or services provided by the vendor?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 5
                        },
                        "order": 1
                    },
                    {
                        "id": 11,
                        "question": "Was the delivery of products or services punctual and in satisfactory condition?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 2
                    },
                    {
                        "id": 12,
                        "question": "Did the vendor fulfil your expectations in terms of product assortment and availability?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 3
                    },
                    {
                        "id": 13,
                        "question": "On a scale of 1 to 10, how would you rate the vendor's pricing in comparison to other alternatives in the market?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 10
                        },
                        "order": 4
                    },
                    {
                        "id": 14,
                        "question": "Was the vendor's product information provided accurately and with sufficient detail?",
                        "answerFormat": {
                            "type": "radio",
                            "options": ["Yes", "No"],
                            "required": true
                        },
                        "order": 5
                    },
                    {
                        "id": 15,
                        "question": "On a scale of 1 to 10, how probable is it that you will continue conducting business with this vendor in the future?",
                        "answerFormat": {
                            "type": "starrating",
                            "required": true,
                            "upperBound": 10
                        },
                        "order": 6
                    }
                ]
            },
            {
                "id": 4,
                "title": "Overall Satisfaction",
                "order": 2,
                "questions": [
                    {
                        "id": 16,
                        "question": "How likely are you to recommend this vendor to others based on your experience?",
                        "answerFormat": {
                            "type": "select",
                            "options": ["Likely", "Highly", "Maybe", "Unlikely", "Doubtful"],
                            "required": true
                        },
                        "order": 1
                    },
                    {
                        "id": 17,
                        "question": "What could we have done to improve your experience?",
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
