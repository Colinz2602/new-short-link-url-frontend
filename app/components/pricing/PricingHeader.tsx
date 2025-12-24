import React from 'react';

const PricingHeader = () => {
    return (
        <div className="bg-brand-dark text-white pt-24 pb-32 px-4 text-center rounded-b-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/40 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500/30 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-3">Features and Pricing</h2>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Choose the appropriate solution for your development
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Start for free. Upgrade to unlock advanced analytics features and unlimited link management.
                </p>
            </div>
        </div>
    );
};

export default PricingHeader;