import React from "react";

interface AuthErrorPopupProps {
    message: string
}

export function AuthErrorPopup(props: AuthErrorPopupProps) {
    const {message} = props
    return (
        <div className="absolute bg-white text-black rounded-t-lg font-bold w-screen font-roboto py-3 px-3 text-sm bottom-0 text-center">
            {message}
        </div>
    )
}