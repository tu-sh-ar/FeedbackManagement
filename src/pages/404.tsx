import { ReactElement } from "react";

export default function Custom404() {
    return (

        <div className="text-center min-h-screen flex justify-center flex-col items-center">
            <p className="text-emphasis text-sm font-semibold uppercase tracking-wide">ERROR 404</p>
            <p className="text-emphasis mt-2 text-4xl font-extrabold sm:text-5xl">This page does not exist.</p>
            <p className="mt-2 inline-block text-lg ">Check for spelling mistakes or go back to the previous page.</p>
        </div>
    );
}


Custom404.getLayout = function getLayout(page: ReactElement) {
    return (
        <div className="min-h-screen flex items-center w-full justify-center bg-white">
            {page}
        </div>
    )
}
