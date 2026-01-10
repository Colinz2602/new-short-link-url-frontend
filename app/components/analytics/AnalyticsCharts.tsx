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
    ChartOptions,
    Filler
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
    Legend,
    Filler
);
ChartJS.defaults.font.family = 'var(--font-geist-sans)';
ChartJS.defaults.color = '#9ca3af';
ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    });
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
    const clicksValues = data.clicksOverTime.map(item => typeof item.count === 'number' ? item.count : parseInt(item.count, 10));

    const lineChartData = {
        labels: clicksLabels,
        datasets: [{
            label: 'Clicks',
            data: clicksValues,
            borderColor: '#2dd4bf',
            backgroundColor: (context: any) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, 'rgba(45, 212, 191, 0.5)');
                gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
                return gradient;
            },
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2dd4bf',
            fill: true,
        }],
    };

    const commonOptions: ChartOptions<any> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.85)', padding: 10, cornerRadius: 8 } },
        scales: { x: { grid: { display: false }, ticks: { color: '#9ca3af' } }, y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' }, border: { dash: [4, 4] } } }
    };

    const createBarData = (sourceData: any[], label: string, color: string) => {
        const labels = sourceData.map(item => {
            let name = item.name || 'Unknown';
            if (label === 'Referrer') name = name.replace(/^https?:\/\//, '').split('/')[0] || 'Direct';
            if (label === 'Device' && name) name = name.charAt(0).toUpperCase() + name.slice(1);
            return name;
        });
        const values = sourceData.map(item => typeof item.value === 'number' ? item.value : parseInt(item.value, 10));
        return { labels, datasets: [{ label, data: values, backgroundColor: color, borderRadius: 6, barThickness: 20 }] };
    };

    const countryChartData = createBarData(data.topCountries, 'Country', '#3b82f6');
    const referrerChartData = createBarData(data.topReferrers, 'Referrer', '#a855f7');
    const deviceChartData = createBarData(data.topDevices, 'Device', '#f59e0b');
    const barOptions: ChartOptions<'bar'> = { ...commonOptions, indexAxis: 'y' };

    const ChartCard = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col ${className}`}>
            <h2 className="text-lg font-bold mb-6 text-gray-200 tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 bg-teal-500 rounded-full"></div>{title}
            </h2>
            <div className="flex-1 w-full min-h-[250px] relative">{children}</div>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartCard title="Click Overview" className="h-full">
                        <Line options={commonOptions} data={lineChartData} />
                    </ChartCard>
                </div>
                <div className="lg:col-span-1 h-full">{rightSideContent}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ChartCard title="Top Countries"><Bar options={barOptions} data={countryChartData} /></ChartCard>
                <ChartCard title="Top Referrers"><Bar options={barOptions} data={referrerChartData} /></ChartCard>
                <ChartCard title="Devices"><Bar options={barOptions} data={deviceChartData} /></ChartCard>
            </div>
        </div>
    );
}