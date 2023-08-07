import React from 'react';
import { Tabs } from 'antd';
import QuestionFormat from '../QuestionFormat';
import { FeedbackFormBodySchema, OnChangeHandlerFn } from '@/pages/feedback-form/[feedback]';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

interface TabinationProps {
    mode: TabPosition;
    isMobile: boolean;
    template: FeedbackFormBodySchema;
    onChange: OnChangeHandlerFn;
    activeTabKey: number;
}

export default function Tabination({ mode, isMobile, template, onChange, activeTabKey }: TabinationProps) {

    return (
        <Tabs
            activeKey={`${activeTabKey}`}
            tabPosition={isMobile? 'top': 'left'}
            className='w-full'
            onTabClick={() =>{}}
            items={template.sections.map((item) => {
                    return {
                        label: item.title,
                        key: `${item.id}`,
                        children: <QuestionFormat 
                            sectionId={item.id}
                            questions={item.questions}
                            onChange={onChange}/>,
                    }
                })
            }
        />
    )
}