'use client';

import { ReactNode } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};

interface AnalyticsChartsProps {
    data: {
        clicksOverTime: any[];
        topCountries: any[];
        topReferrers: any[];
        topDevices: any[];
    };
    rightSideContent?: ReactNode;
}

export default function AnalyticsCharts({ data, rightSideContent }: AnalyticsChartsProps) {
    const clicksLabels = data.clicksOverTime.map(item => formatDate(item.date));
    const clicksValues = data.clicksOverTime.map(item =>
        typeof item.count === 'number' ? item.count : parseInt(item.count, 10)
    );

    const lineChartData = {
        labels: clicksLabels,
        datasets: [
            {
                label: 'Lượt Click',
                data: clicksValues,
                borderColor: 'rgb(79, 70, 229)',
                backgroundColor: 'rgba(79, 70, 229, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const lineOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
        },
        scales: {
            y: { beginAtZero: true, ticks: { precision: 0 } }
        }
    };

    const createBarData = (sourceData: any[], label: string, color: string) => {
        const labels = sourceData.map(item => {
            let name = item.name || 'Unknown';
            if (label === 'Referrer') {
                name = name.replace('https://', '').replace('http://', '').split('/')[0] || 'Direct';
            }
            if (label === 'Device' && item.name) {
                name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            }
            return name;
        });

        const values = sourceData.map(item =>
            typeof item.value === 'number' ? item.value : parseInt(item.value, 10)
        );

        return {
            labels,
            datasets: [
                {
                    label: label,
                    data: values,
                    backgroundColor: color,
                },
            ],
        };
    };

    const barOptions: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: { beginAtZero: true, ticks: { precision: 0 } }
        }
    };

    const countryChartData = createBarData(data.topCountries, 'Country', 'rgba(34, 197, 94, 0.7)'); // Green
    const referrerChartData = createBarData(data.topReferrers, 'Referrer', 'rgba(168, 85, 247, 0.7)'); // Purple
    const deviceChartData = createBarData(data.topDevices, 'Device', 'rgba(234, 179, 8, 0.7)'); // Yellow

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Biểu đồ Click (bên trái) + Nội dung phụ/QR (bên phải) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Tổng quan lượt click</h2>
                    <div className="w-full h-[300px]">
                        <Line options={lineOptions} data={lineChartData} />
                    </div>
                </div>

                {/* Khu vực hiển thị QRCode */}
                <div className="lg:col-span-1">
                    {rightSideContent}
                </div>
            </div>

            {/* Top Country & Referrer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Top Quốc gia</h2>
                    <div className="w-full h-[300px]">
                        <Bar options={barOptions} data={countryChartData} />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Nguồn truy cập (Referrer)</h2>
                    <div className="w-full h-[300px]">
                        <Bar options={barOptions} data={referrerChartData} />
                    </div>
                </div>
            </div>

            {/* Top Device */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Thiết bị</h2>
                <div className="w-full h-[300px]">
                    <Bar options={barOptions} data={deviceChartData} />
                </div>
            </div>
        </div>
    );
}