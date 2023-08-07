import { useEffect, useState, useCallback } from "react";
import Tabination from "@/components/Tabination";
import useJwtDecode from "@/hooks/useJwtDecode";
import { fetchSectionQuestionAnswers, transformTemplateToAnswer } from "@/utils";
import { validateAnswer } from "@/utils/validation";
import { Button } from "antd";
import { useRouter } from "next/router";
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { urls } from "@/assets/contants";


export interface FeedbackFormBodySchema {
    businessCategory?: number;
    feedbackType: string;
    templateName: string;
    sections: {
        id: number;
        title: string;
        order: number;
        questions: {
            id: number;
            question: string;
            answerFormat: {
                type: string;
                options?: string[];
                required: boolean;
                upperBound?: number;
            };
            order: number;
        }[];
    }[];
}

export interface Answer {
    sections: {
        id: number;
        title: string;
        questions: {
            id: number;
            answerFormat: string;
            required: Boolean;
            answer: AnswerTypeInterface;
        }[];
    }[];
}

export interface OnChangeHandlerFn {
    (sectionId: number, questionId: number,
        answerFormat: string, answer: AnswerTypeInterface): void;
}

export type AnswerTypeInterface = string | number | string[] | Boolean | null


export default function FeedbackForm() {

    const router = useRouter();

    const { query } = router;
    const token = query.feedback as string;
    const decodedToken = useJwtDecode(token);
    const [answer, setAnswer] = useState<Answer>({ sections: [] });
    const [template, setTemplate] = useState<FeedbackFormBodySchema | null>()
    const [isMobile, setIsMobile] = useState(false);
    const [loader, setLoader] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement,
        response: { title: string, error: string }) => {

        api.error({
            message: response.title,
            description: response.error,
            placement,
        });
    };

    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        handleWindowSizeChange()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, [])

    const fetchTemplateAPI = useCallback(async (templateId: string) => {
        try {
            const res = await fetch(
                `${urls.post}/${templateId}`
            );
            const data = await res.json();
            return data.response
        } catch (err) {
            router.replace('/500')
        }
    }, [router]);

    const submitFeedback = async (templateId: string, data: any) => {
        try {
            const body = {
                ...decodedToken?.linkBodyDto,
                sectionResponse: data
            }
            const response = await fetch(`${urls.get}/${templateId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

            if (!response.ok) {
                openNotification('topRight',
                    { title: 'Server error', error: 'Something went wrong!' })
            } else {
                router.replace('/200')
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        (async () => {
            if (decodedToken) {
                try {
                    const templateObj = await fetchTemplateAPI(decodedToken.templateId)
                    setTemplate(templateObj)
                    const answerBody = transformTemplateToAnswer(templateObj);
                    setAnswer(answerBody)
                } catch (error) {
                    console.log(error)
                }
            }
        })()
    }, [decodedToken, fetchTemplateAPI])

    const onChangeHandler = (
        sectionId: number,
        questionId: number,
        answerType: string,
        value: AnswerTypeInterface
    ) => {
        setAnswer((prevAnswer) => {
            const updatedSections = prevAnswer.sections.map((section) => {
                if (section.id === sectionId) {
                    const updatedQuestions = section.questions.map((question) => {
                        if (question.id === questionId) {
                            return {
                                ...question,
                                answerFormat: answerType,
                                answer: value,
                            };
                        }
                        return question;
                    });
                    return {
                        ...section,
                        questions: updatedQuestions,
                    };
                }
                return section;
            });
            return {
                ...prevAnswer,
                sections: updatedSections,
            };
        });
    };

    const validationHandler = () => {
        const response = validateAnswer(answer.sections[activeTabKey - 1])
        if (response && response.length > 0) {
            setLoader(false)

            const res = response[0]
            const title = `${res.sectionTitle} (${res.question})`
            const error = res.error

            openNotification('topRight', { title, error })
            return false
        }
        return true
    }

    const submitHandler = async () => {
        setLoader(true)
        if (!validationHandler()) return;
        if (!decodedToken) return false;
        const sectionQuestionAnswers = fetchSectionQuestionAnswers(answer);
        await submitFeedback(decodedToken.templateId, sectionQuestionAnswers)
        setLoader(false)
    }


    const [activeTabKey, setActiveTabkey] = useState<number>(1)
    const onNextTabHandler = () => {
        if (!validationHandler()) return;
        setActiveTabkey((e) => e + 1)
    }

    const onPreviousTabHandler = () => {
        setActiveTabkey((e) => e - 1)
    }


    return (
        <main className={`flex min-h-screen flex-col 
            items-center p-0 sm:p-24 bg-white sm:bg-transparent`}>

            {template && <>
                <p className="text-left font-semibold text-lg mt-4 
                    sm:text-xl mb-4 sm:mb-2 opacity-50">{template.templateName}</p>
                <Tabination
                    mode="left"
                    isMobile={isMobile}
                    template={template}
                    onChange={onChangeHandler}
                    activeTabKey={activeTabKey} />
                <div className='flex justify-end w-full mt-4 p-4 sm:p-0'>
                    {
                        template.sections.length === activeTabKey ?
                            (<>
                                {
                                    activeTabKey !== 1 &&
                                    (<Button
                                        type="primary"
                                        className='bg-[#4096ff] mx-2'
                                        onClick={onPreviousTabHandler}>Back</Button>)
                                }
                                <Button
                                    type="primary"
                                    className='bg-[#4096ff]'
                                    loading={loader}
                                    onClick={submitHandler}>Submit</Button>
                            </>

                            ) :
                            (
                                <Button
                                    type="primary"
                                    className='bg-[#4096ff]'
                                    loading={loader}
                                    onClick={onNextTabHandler}>Next</Button>
                            )
                    }

                </div>
            </>}
            {contextHolder}

        </main>
    )
}

