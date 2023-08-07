import { Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

const customEmojiIcons: Record<number, ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

interface EmojiRatingProps {
    count: number;
    onChange: (value: number) => void;
}

export default function EmojiRating({ count, onChange }: EmojiRatingProps) {
    return (
        <Rate
            count={5}
            // character={({ index }: { index: number }) => customEmojiIcons[index + 1]}
            onChange={onChange} />
    )
}