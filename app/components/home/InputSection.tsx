'use client';

import { useGuestShortener } from '../../hooks/useGuestShortener';
import Illustration from './components/Illustration';
import InputForm from './components/InputForm';
import LinkHistoryList from './components/LinkHistoryList';

export default function InputSection() {
    // 1. Gọi logic từ Hook
    const {
        url, setUrl,
        loading,
        error,
        createdLinks,
        domains,
        selectedDomain, setSelectedDomain,
        handleShorten
    } = useGuestShortener();

    return (
        <section className="relative pt-10 pb-20 px-4 overflow-hidden min-h-[600px]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Cột trái: Nội dung chính */}
                <div className="z-10 animate-in slide-in-from-left-10 duration-700">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                        URL Shortener <br />
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                        Nền tảng rút gọn link thông minh (Smart Shortlink Platform). Mục tiêu của hệ thống là tạo, quản lý và phân tích link rút gọn, đồng thời mở rộng thành một bộ công cụ AI hỗ trợ creator & marketer (gồm downloader, script generator, SEO tools…).
                    </p>

                    {/* 2. Form Component */}
                    <InputForm
                        url={url}
                        setUrl={setUrl}
                        domains={domains}
                        selectedDomain={selectedDomain}
                        setSelectedDomain={setSelectedDomain}
                        loading={loading}
                        onSubmit={handleShorten}
                    />

                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="max-w-xl mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* 3. List Component */}
                    <LinkHistoryList links={createdLinks} />
                </div>

                {/* 4. Visual Component */}
                <Illustration />
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]"></div>
            </div>
        </section>
    );
}