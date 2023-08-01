import { ReactElement } from "react";

export default function Custom500() {
    return (

        <div className="text-center min-h-screen flex justify-center flex-col items-center">
            <p className="text-emphasis text-sm font-semibold uppercase tracking-wide">ERROR 500</p>
            <p className="text-emphasis mt-2 text-4xl font-extrabold sm:text-5xl">Server error.</p>
            <p className="mt-2 inline-block text-lg ">Oops! Something went wrong. Please check your internet connection or try again later.</p>
        </div>
    );
}


Custom500.getLayout = function getLayout(page: ReactElement) {
    return (
        <div className="min-h-screen flex items-center w-full justify-center bg-white">
            {page}
        </div>
    )
}
