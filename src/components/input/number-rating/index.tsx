
import { Rate } from 'antd';
 
interface NumberRatingProps {
    count: number;
}

export default function NumberRating({ count }: NumberRatingProps) {
    return (
        <Rate 
            count={count}
            defaultValue={2} 
            character={({ index }: { index: number }) => index + 1} />
    )
}
