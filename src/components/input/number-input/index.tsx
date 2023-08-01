import { InputNumber } from 'antd';

interface NumberInputProps {
    defaultVal?: number;
    minimun: number;
    onChange: () => void;
}


export default function NumberInput({ 
    onChange,
    minimun,
    defaultVal }: NumberInputProps) {

    return (
        <InputNumber 
            min={minimun} 
            defaultValue={defaultVal} 
            onChange={onChange} />
    )
}