import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';


export default function RadioInput({ options, onChange }: 
    { options: string[], onChange: (value: number) => void; }) {

    const onChangeHandler = (e: RadioChangeEvent) => {
        onChange(e.target.value)
    };

    return (
        <Radio.Group name="radiogroup"
            className='flex flex-col sm:flex-row flex-wrap' 
            onChange={onChangeHandler} 
            defaultValue={1}>
            {options.map((item) => (
                <Radio key={item} value={item}>{item}</Radio>
            ))}
        </Radio.Group>
    )
}