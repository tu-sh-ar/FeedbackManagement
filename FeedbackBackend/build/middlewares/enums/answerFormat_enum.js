"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypes = exports.TemplateType = exports.answerFormat = void 0;
var answerFormat;
(function (answerFormat) {
    answerFormat[answerFormat["Rating"] = 1] = "Rating";
    answerFormat[answerFormat["Radio"] = 2] = "Radio";
    answerFormat[answerFormat["Textbox"] = 3] = "Textbox";
})(answerFormat = exports.answerFormat || (exports.answerFormat = {}));
var TemplateType;
(function (TemplateType) {
    TemplateType[TemplateType["CUSTOM"] = 1] = "CUSTOM";
    TemplateType[TemplateType["DEFAULT"] = 2] = "DEFAULT";
})(TemplateType = exports.TemplateType || (exports.TemplateType = {}));
const FieldTypesMap = {
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
exports.FieldTypes = Object.keys(FieldTypesMap);
