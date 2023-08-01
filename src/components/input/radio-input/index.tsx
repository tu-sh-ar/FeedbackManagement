import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';


export default function RadioInput({ options, onChange }: 
    { options: string[], onChange: (value: number) => void; }) {

    const onChangeHandler = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        onChange(e.target.value)
    };

    return (
        <Radio.Group name="radiogroup"  onChange={onChangeHandler} defaultValue={1}>
            {options.map((item) => (
                <Radio key={item} value={item}>{item}</Radio>
            ))}
        </Radio.Group>
    )
}