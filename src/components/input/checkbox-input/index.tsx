import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';


interface CheckboxInputProps {
    onChange: (value:Boolean) => void;
    text: string;
    error?: string;
}

export default function CheckboxInput(
    { text, onChange, error }: CheckboxInputProps) {

    const onChangeHandler = (val: CheckboxChangeEvent) => {
        console.log(val)
        const value =  val.target.checked;
        onChange(value)
    }

    return (
        <>
            <Checkbox onChange={onChangeHandler}>{text}</Checkbox>
            {error && <p className='text-red-600 ml-1 mt-2'>{error}</p>}
        </>
    )
}