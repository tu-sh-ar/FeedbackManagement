import { ReactElement } from "react";
import { Button, Result } from 'antd';

export default function Custom200() {
    return (

        <div className="text-center min-h-screen flex justify-center flex-col items-center px-4 sm:px-24">
            <Result
                status="success"
                title="Feedback Submitted Successfully!"
                subTitle="Thank you for taking the time to provide your valuable feedback. Your input is essential to us and helps us improve our services. We appreciate your contribution to making our product better."
            />
        </div>
    );
}


Custom200.getLayout = function getLayout(page: ReactElement) {
    return (
        <div className="min-h-screen flex items-center w-full justify-center bg-white">
            {page}
        </div>
    )
}
