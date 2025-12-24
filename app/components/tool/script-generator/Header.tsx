import React from 'react';

export default function Header() {
    return (
        <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600 mb-4">
                AI Script Generator
            </h1>
            <p className="text-gray-400">
                Turn any video link into Script, Caption & Keywords for TikTok, Reels & Shorts.
            </p>
        </div>
    );
}