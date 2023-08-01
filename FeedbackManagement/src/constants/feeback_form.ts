const templates = [
        {
            "templateName": "Default Template 1",
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
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 2
                        }
                    ]
                }
            ]
        },
        {
            "templateName": "Default Template 2",
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
                            "id": 11,
                            "question": "How do you rate our product?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 1
                        },
                        {
                            "id": 12,
                            "question": "Please share photo/video of the product",
                            "answerFormat": {
                                "type": "file",
                                "required": false
                            },
                            "order": 2
                        },
                        {
                            "id": 13,
                            "question": "Please share your review for the product",
                            "answerFormat": {
                                "type": "textarea",
                                "required": false
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
                            "id": 14,
                            "question": "How satisfied were you with the quality of the packaging materials used for your order?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Satisfied", "Excellent", "Good", "Average", "Not Satisfied"],
                                "required": false
                            },
                            "order": 1
                        },
                        {
                            "id": 15,
                            "question": "How good was the packaging to protect the contents of your package?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Excellent", "Good", "Average", "Bad"],
                                "required": false
                            },
                            "order": 2
                        },
                        {
                            "id": 16,
                            "question": "Did you experience any issues or damage to the contents of your order due to packaging concerns?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": false
                            },
                            "order": 3
                        },
                        {
                            "id": 17,
                            "question": "Was the packaging environmentally friendly or made from sustainable materials?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": false
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
                            "id": 18,
                            "question": "Do you have any feedback on the overall experience of using the service and any suggestions for improvement?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": false
                            },
                            "order": 1
                        }
                    ]
                }
            ]
        },
        {
            "templateName": "Default Template 1",
            "templateType": 2,
            "feedbackType": "64b155857d75d86fd1af82c3",
            "businessCategory": 1,
            "sections": [
                {
                    "id": 1,
                    "title": "Delivery Personnel",
                    "order": 1,
                    "questions": [
                        {
                            "id": 19,
                            "question": "How would you rate the professionalism and behavior of the delivery personnel?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 1
                        },
                        {
                            "id": 20,
                            "question": "Did they exhibit a friendly and courteous attitude during the delivery process?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 2
                        },
                        {
                            "id": 21,
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
                            "id": 22,
                            "question": "How satisfied were you with the timeliness of the delivery service?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
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
                            "id": 23,
                            "question": "How effective was the delivery service in providing timely and accurate updates about your delivery?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
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
                            "id": 24,
                            "question": "How would you rate the overall smoothness and efficiency of the delivery process for your order?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 1
                        },
                        {
                            "id": 25,
                            "question": "Were there any difficulties or issues encountered during the delivery process?",
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
                    "id": 5,
                    "title": "Overall Satisfaction",
                    "order": 5,
                    "questions": [
                        {
                            "id": 26,
                            "question": "How satisfied were you with the delivery service?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 1
                        },
                        {
                            "id": 27,
                            "question": "Is there anything specific you appreciated or think could be improved about the delivery service?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 2
                        }
                    ]
                }
            ]
        },
        {
            "templateName": "Default Template 2",
            "templateType": 2,
            "feedbackType": "64b155857d75d86fd1af82c3",
            "businessCategory": 1,
            "sections": [
                {
                    "id": 1,
                    "title": "Timeliness and Punctuality",
                    "order": 1,
                    "questions": [
                        {
                            "id": 28,
                            "question": "How satisfied were you with the timeliness of the delivery service?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Satisfied", "Punctual", "Quick", "Average", "Delayed", "Unsatisfied"],
                                "required": false
                            },
                            "order": 1
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "Delivery Personnel",
                    "order": 2,
                    "questions": [
                        {
                            "id": 29,
                            "question": "How professional were the delivery personnel?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Highly professional", "Extremely professional", "Moderately professional", "Somewhat professional", "Not Professional"],
                                "required": false
                            },
                            "order": 1
                        },
                        {
                            "id": 30,
                            "question": "How would you rate their friendliness and courtesy during delivery?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 2
                        },
                        {
                            "id": 31,
                            "question": "How well were specific delivery instructions or requests handled?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Excellent", "Perfectly", "Exceptionally", "Poorly", "Unsatisfactorily"],
                                "required": false
                            },
                            "order": 3
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "Delivery Process",
                    "order": 3,
                    "questions": [
                        {
                            "id": 32,
                            "question": "How smooth and efficient was the overall delivery process for your order?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Smooth", "Satisfactory", "Good", "Average", "Problematic"],
                                "required": false
                            },
                            "order": 1
                        },
                        {
                            "id": 33,
                            "question": "Did you receive notifications or tracking information that kept you informed about the status of your package?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": false
                            },
                            "order": 2
                        }
                    ]
                },
                {
                    "id": 4,
                    "title": "Overall contentment",
                    "order": 4,
                    "questions": [
                        {
                            "id": 34,
                            "question": "How satisfied were you with the delivery service?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Satisfied", "Excellent", "Good", "Unsatisfied", "Disappointed"],
                                "required": false
                            },
                            "order": 1
                        },
                        {
                            "id": 35,
                            "question": "Were there any particular areas of the delivery service that you feel could benefit from additional attention or improvements?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": false
                            },
                            "order": 2
                        }
                    ]
                }
            ]
        },
        {
            "templateName": "Default Template 1",
            "feedbackType": "64b156357d75d86fd1af82c5",
            "templateType": 2,
            "businessCategory": 1,
            "sections": [
                {
                    "id": 1,
                    "title": "Customer Service",
                    "order": 1,
                    "questions": [
                        {
                            "id": 36,
                            "question": "How satisfied were you with the responsiveness of the customer support team?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Satisfied", "Quick", "Slow", "Dissatisfied", "Unresponsive", "Delayed"],
                                "required": false
                            },
                            "order": 1
                        },
                        {
                            "id": 37,
                            "question": "Were you satisfied with the level of knowledge and expertise demonstrated by the customer support representatives?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 2
                        },
                        {
                            "id": 38,
                            "question": "Were there any instances where the customer support team went above and beyond to assist you?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 3
                        },
                        {
                            "id": 39,
                            "question": "How would you rate the friendliness and professionalism of the customer support representatives?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 4
                        },
                        {
                            "id": 40,
                            "question": "Were you able to easily reach the customer support team through your preferred communication channels (e.g., phone, email, live chat)?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 5
                        },
                        {
                            "id": 41,
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
                            "id": 42,
                            "question": "Overall, how satisfied were you with the customer support experience provided by the ecommerce platform?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Satisfied", "Good", "Average", "Disappointed", "Unsatisfied"],
                                "required": true
                            },
                            "order": 1
                        }
                    ]
                }
            ]
        },
        {
            "templateName": "Default Template 2",
            "feedbackType": "64b156357d75d86fd1af82c5",
            "templateType": 2,
            "businessCategory": 1,
            "sections": [
                {
                    "id": 1,
                    "title": "Customer Service",
                    "order": 1,
                    "questions": [
                        {
                            "id": 43,
                            "question": "How satisfied were you with the responsiveness of the customer support team?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 1
                        },
                        {
                            "id": 44,
                            "question": "Did the customer support team address your inquiries and concerns in a timely manner?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 2
                        },
                        {
                            "id": 45,
                            "question": "How would you rate the overall helpfulness and effectiveness of the customer support team?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 3
                        },
                        {
                            "id": 46,
                            "question": "Were there any instances where the customer support team went above and beyond to assist you?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": false
                            },
                            "order": 4
                        },
                        {
                            "id": 47,
                            "question": "Did the customer support team provide clear and accurate information to resolve your issues or answer your questions?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": false
                            },
                            "order": 5
                        },
                        {
                            "id": 48,
                            "question": "How satisfied were you with the customer support team's resolution of your concerns or issues?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Satisfied", "Good", "Average", "Disappointed", "Unsatisfied"],
                                "required": false
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
                            "id": 49,
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
            "templateName": "Default Template 1",
            "templateType": 2,
            "feedbackType": "64b1569c7d75d86fd1af82c7",
            "businessCategory": 1,
            "sections": [
                {
                    "id": 1,
                    "title": "Service Feedback",
                    "order": 1,
                    "questions": [
                        {
                            "id": 50,
                            "question": "How would you rate the overall shopping experience on the ecommerce platform?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 1
                        },
                        {
                            "id": 51,
                            "question": "How easy was it to find the products you were looking for?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Easy", "Difficult", "Moderate", "Very difficult", "Could be better", "I had to search a lot"],
                                "required": false
                            },
                            "order": 2
                        },
                        {
                            "id": 52,
                            "question": "How was the checkout process? (Rating)",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 3
                        },
                        {
                            "id": 53,
                            "question": "How was the shipping process? (Rating)",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 4
                        },
                        {
                            "id": 54,
                            "question": "How was the product information presented?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 5
                        },
                        {
                            "id": 55,
                            "question": "How would you rate the customer service you received?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 6
                        },
                        {
                            "id": 56,
                            "question": "Were your concerns or issues effectively resolved by the customer support team?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 7
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "Overall Satisfaction",
                    "order": 2,
                    "questions": [
                        {
                            "id": 57,
                            "question": "How likely are you to recommend the ecommerce platform to others based on your experience?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "Maybe", "No"],
                                "required": true
                            },
                            "order": 1
                        },
                        {
                            "id": 58,
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
        },
        {
            "templateName": "Default Template 2",
            "feedbackType": "64b1569c7d75d86fd1af82c7",
            "templateType": 2,
            "businessCategory": 1,
            "sections": [
                {
                    "id": 1,
                    "title": "Service Feedback",
                    "order": 1,
                    "questions": [
                        {
                            "id": 59,
                            "question": "What did you think of the overall shopping experience on our platform?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 1
                        },
                        {
                            "id": 60,
                            "question": "Were you able to easily navigate and find the products or services you were looking for?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 2
                        },
                        {
                            "id": 61,
                            "question": "Did you encounter any difficulties during the ordering process?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 3
                        },
                        {
                            "id": 62,
                            "question": "Were the product descriptions and details accurate and helpful in making your purchasing decisions?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 4
                        },
                        {
                            "id": 63,
                            "question": "How satisfied were you with the variety and range of products or services available?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Satisfied", "Good", "Average", "Disappointed", "Unsatisfied"],
                                "required": true
                            },
                            "order": 5
                        },
                        {
                            "id": 64,
                            "question": "Did the ecommerce platform provide clear and transparent pricing information?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 6
                        },
                        {
                            "id": 65,
                            "question": "Were you satisfied with the payment options and checkout process?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 7
                        },
                        {
                            "id": 66,
                            "question": "How would you rate the packaging and condition of the products upon delivery?",
                            "answerFormat": {
                                "type": "starrating",
                                "required": false,
                                "upperBound": 5
                            },
                            "order": 8
                        },
                        {
                            "id": 67,
                            "question": "Did the delivery service meet your expectations in terms of timeliness and efficiency?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 9
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "Overall Satisfaction",
                    "order": 2,
                    "questions": [
                        {
                            "id": 68,
                            "question": "Would you recommend our platform to your friends and family?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "Maybe", "No"],
                                "required": true
                            },
                            "order": 1
                        },
                        {
                            "id": 69,
                            "question": "Were there any particular areas of the delivery service that you feel could benefit from additional attention or improvements?",
                            "answerFormat": {
                                "type": "radio",
                                "options": ["Yes", "No"],
                                "required": true
                            },
                            "order": 2
                        }
                    ]
                }
            ]
        }
    ]
