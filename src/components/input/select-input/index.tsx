import { Select } from 'antd';


interface OptionProps {
    value: string;
    label: string;
}

interface SelectInputProps {
    placeholder?: string;
    onChange: (val: string) => void;
    onSearch: (val: string) => void
    options: OptionProps[]

}
export default function SelectInput({ placeholder, 
    onChange, onSearch, options }: SelectInputProps) {

    return (
        <Select
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[ ...options ]}
        />
    )
}