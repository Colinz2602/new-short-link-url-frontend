import React from 'react';

interface SchedulingSectionProps {
    scheduleAt: string;
    setScheduleAt: (val: string) => void;
    expireAt: string;
    setExpireAt: (val: string) => void;
}

export default function SchedulingSection({
    scheduleAt,
    setScheduleAt,
    expireAt,
    setExpireAt
}: SchedulingSectionProps) {
    return (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                Lên lịch & Hạn dùng (Schedule)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ngày bắt đầu */}
                <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-500">Ngày bắt đầu</label>
                    <input
                        type="datetime-local"
                        value={scheduleAt}
                        onChange={(e) => setScheduleAt(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Để trống nếu muốn chạy ngay.</p>
                </div>

                {/* Ngày hết hạn */}
                <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-500">Ngày hết hạn</label>
                    <input
                        type="datetime-local"
                        value={expireAt}
                        onChange={(e) => setExpireAt(e.target.value)}
                        min={scheduleAt || new Date().toISOString().slice(0, 16)}
                        className="w-full px-3 py-2 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Để trống nếu muốn chạy vĩnh viễn.</p>
                </div>
            </div>
        </div>
    );
}