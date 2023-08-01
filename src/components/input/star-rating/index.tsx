import { Rate } from 'antd';

interface StarRatingProps {
    onChange: (value: number) => void;
    count: number;
}

export default function StarRating({ count, onChange }: StarRatingProps){
    return (
        <Rate 
            count={count}
            onChange={onChange}/>
    )
}