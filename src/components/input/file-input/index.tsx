import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';


interface FileInputProps {
    onChange: (value: string[]) => void;
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function FileInput({ onChange }: FileInputProps) {

    const [files, setFiles] = useState<UploadFile[]>([])
    const [urls, setUrls] = useState<string[]>([])

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = async (
        { file, fileList: newFileList }: { file: any, fileList: any }) => {
        let url: string = "";
        // console.log(file.response, file);

        if (file.status === "done" && file.response && file.response) {
            url = file.response.response.url;
            setUrls((prevUrls) => [...prevUrls, url]);
        } else if (file.status === "removed" && file.response && file.response.response.url) {
            const removedUrl = file.response.response.url;
            setUrls((prevUrls) => prevUrls.filter((item) => item !== removedUrl));
        }

        setFiles(newFileList);
    };

    useEffect(() => {
        onChange(urls);
    }, [urls, onChange])

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                action="http://localhost:3000/api/v1/templateResponse/uploadImages"
                accept='image/jpeg, image/png, image/gif'
                maxCount={5}
                listType="picture-card"
                fileList={files}
                onPreview={handlePreview}
                onChange={handleChange}>
                {files.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <Image alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}