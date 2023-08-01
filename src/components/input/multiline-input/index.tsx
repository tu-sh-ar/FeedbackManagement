import { Input } from 'antd';
const { TextArea } = Input;

interface MultilineInputProps {
    minRows: number;
    placeholder?: string;
    onChange: (value: string) => void;
}


export default function MultilineInput({ 
    minRows, 
    placeholder, 
    onChange 
}: MultilineInputProps) {
    
    return (
        <TextArea
            placeholder={placeholder}
            autoSize={{ minRows: minRows }}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}