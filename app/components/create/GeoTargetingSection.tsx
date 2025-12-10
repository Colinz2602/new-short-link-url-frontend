import { useMemo } from 'react';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import viLocale from 'i18n-iso-countries/langs/vi.json';
import { GeoRule } from '../../types';

countries.registerLocale(enLocale);
countries.registerLocale(viLocale);

interface GeoTargetingSectionProps {
    showAdvanced: boolean;
    setShowAdvanced: (show: boolean) => void;
    geoRules: GeoRule[];
    addGeoRule: () => void;
    removeGeoRule: (index: number) => void;
    updateGeoRule: (index: number, field: 'country' | 'url', value: string) => void;
}

export default function GeoTargetingSection({
    showAdvanced,
    setShowAdvanced,
    geoRules,
    addGeoRule,
    removeGeoRule,
    updateGeoRule
}: GeoTargetingSectionProps) {

    const countryOptions = useMemo(() => {
        return Object.entries(countries.getNames('en', { select: 'official' }))
            .map(([code, name]) => ({
                value: code,
                label: `${name} (${code})`
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    return (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-blue-600 font-semibold hover:underline"
            >
                {showAdvanced ? '▼' : '►'} Cấu hình nâng cao (Geo Targeting)
            </button>

            {showAdvanced && (
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-500 mb-3">
                        Điều hướng người dùng đến URL khác dựa trên quốc gia của họ.
                    </p>

                    {geoRules.map((rule, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2 mb-3 items-start md:items-center">
                            <div className="w-full md:w-5/12">
                                <Select
                                    options={countryOptions}
                                    value={countryOptions.find(opt => opt.value === rule.country)}
                                    onChange={(option) => updateGeoRule(index, 'country', option?.value || '')}
                                    placeholder="Tìm quốc gia..."
                                    classNamePrefix="react-select"
                                    isSearchable={true}
                                />
                            </div>
                            <input
                                type="url"
                                value={rule.url}
                                onChange={(e) => updateGeoRule(index, 'url', e.target.value)}
                                placeholder="https://vn.example.com"
                                className="w-full md:w-7/12 px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => removeGeoRule(index)}
                                className="text-red-500 hover:text-red-700 px-2 font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addGeoRule}
                        className="mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
                    >
                        + Thêm Quốc gia
                    </button>
                </div>
            )}
        </div>
    );
}