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
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Start Date
                    </label>
                    <input
                        type="datetime-local"
                        value={scheduleAt}
                        onChange={(e) => setScheduleAt(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm scheme-dark"
                    />
                    <p className="text-[10px] text-gray-500">
                        Leave empty to start immediately.
                    </p>
                </div>

                {/* Expiration Date */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Expiration Date
                    </label>
                    <input
                        type="datetime-local"
                        value={expireAt}
                        onChange={(e) => setExpireAt(e.target.value)}
                        min={scheduleAt || new Date().toISOString().slice(0, 16)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm scheme-dark"
                    />
                    <p className="text-[10px] text-gray-500">
                        Leave empty to never expire.
                    </p>
                </div>
            </div>
        </div>
    );
}
