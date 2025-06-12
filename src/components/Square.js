import React from "react";

const Square = ({imageName, title, content}) => {
    return (
        <div className="items-center justify-center h-56 rounded-2xl border border-emerald-200">
            <div className="flex text-2xl text-white pl-6 pb-2 pt-4">
                <img src={imageName} alt="groveprice" className="h-8 pt-2" />
                <p className="pl-2">{title}</p>
            </div>

            <div className="text-3xl font-bold text-white pl-6">
                {content}
            </div>
        </div>
    );
};

export default Square;
