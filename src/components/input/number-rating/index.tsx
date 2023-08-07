
import { Rate } from 'antd';
 
interface NumberRatingProps {
    count: number;
}

export default function NumberRating({ count }: NumberRatingProps) {
    return (
        <Rate 
            count={count} 
            // character={({ index }: { index: number }) => index + 1} 
            />
    )
}
