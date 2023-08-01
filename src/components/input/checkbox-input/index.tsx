import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';


interface CheckboxInputProps {
    onChange: (value:Boolean) => void;
    text: string;
}

export default function CheckboxInput(
    { text, onChange }: CheckboxInputProps) {

    const onChangeHandler = (val: CheckboxChangeEvent) => {
        console.log(val)
        const value =  val.target.checked;
        onChange(value)
    }

    return (
        <Checkbox onChange={onChangeHandler}>{text}</Checkbox>
    )
}