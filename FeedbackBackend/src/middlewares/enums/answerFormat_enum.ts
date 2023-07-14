export enum answerFormat {
    Rating = 1,
    Radio,
    Textbox
}

export enum TemplateType {
    CUSTOM = 1,
    DEFAULT = 2
} 

const FieldTypesMap: Record<
    string,
    {
        value: string;
        label: string;
        needsOptions?: boolean;
        isTextType?: boolean;
        needsUpperBound?: boolean;
    }
> = {
    text: {
        label: "Short Text",
        value: "text",
        isTextType: true,
    },
    file: {
        label: "File",
        value: "file",
    },
    number: {
        label: "Number",
        value: "number",
        isTextType: true,
    },
    rating: {
        label: "Star Rating",
        value: "number",
        needsUpperBound: true,
    },
    numberrating: {
        label: "Number Rating",
        value: "number",
        needsUpperBound: true,
    },
    emojirating: {
        label: "Emoji Rating",
        value: "number",
        needsUpperBound: true,
    },
    textarea: {
        label: "Long Text",
        value: "textarea",
        isTextType: true,
    },
    select: {
        label: "Select",
        value: "select",
        needsOptions: true,
        isTextType: true,
    },
    multiselect: {
        label: "MultiSelect",
        value: "multiselect",
        needsOptions: true,
        isTextType: false,
    },
    radio: {
        label: "Radio",
        value: "radio",
        needsOptions: true,
        isTextType: false,
    },
    checkbox: {
        label: "Checkbox Group",
        value: "checkbox",
        needsOptions: true,
        isTextType: false,
    },
    boolean: {
        label: "Checkbox",
        value: "boolean",
        isTextType: false,
    },
};

export const FieldTypes = Object.keys(FieldTypesMap);