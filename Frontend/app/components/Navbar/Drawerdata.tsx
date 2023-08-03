import React from "react";
import Link from "next/link";
import Contactusform from "./Ingresar";

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Data = () => {
    return (
        <div className="rounded-md max-w-sm w-full mx-auto">
            <div className="flex-1 space-y-4 py-1">
                <div className="sm:block">
                    <div className="space-y-1 px-5 pt-2 pb-3">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Data;
