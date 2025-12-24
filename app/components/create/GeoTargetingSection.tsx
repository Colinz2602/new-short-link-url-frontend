import { useMemo } from 'react';
import Select, { StylesConfig } from 'react-select';
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

// Custom styles for Dark Mode
const customSelectStyles: StylesConfig<any, false> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        borderColor: state.isFocused ? '#3b82f6' : '#374151',
        color: 'white',
        padding: '2px',
        borderRadius: '0.75rem',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1f2937',
        border: '1px solid #374151',
        zIndex: 9999,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#374151' : '#1f2937',
        color: 'white',
        cursor: 'pointer',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    input: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#9ca3af',
    }),
};

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
        <div className="border-t border-gray-700/50 pt-4">
            <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
                <span className="mr-2">{showAdvanced ? '▼' : '►'}</span>
                Advanced Settings (Geo Targeting)
            </button>

            {showAdvanced && (
                <div className="mt-4 bg-gray-800/40 p-4 rounded-xl border border-dashed border-gray-600 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-gray-400 mb-4">
                        Redirect users to different URLs based on their country.
                    </p>

                    {geoRules.map((rule, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row gap-3 mb-4 items-start md:items-center"
                        >
                            <div className="w-full md:w-5/12">
                                <Select
                                    options={countryOptions}
                                    value={countryOptions.find(opt => opt.value === rule.country)}
                                    onChange={(option) =>
                                        updateGeoRule(index, 'country', option?.value || '')
                                    }
                                    placeholder="Select a country..."
                                    styles={customSelectStyles}
                                    isSearchable={true}
                                />
                            </div>

                            <input
                                type="url"
                                value={rule.url}
                                onChange={(e) =>
                                    updateGeoRule(index, 'url', e.target.value)
                                }
                                placeholder="https://us.example.com"
                                className="w-full md:w-7/12 px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />

                            <button
                                type="button"
                                onClick={() => removeGeoRule(index)}
                                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                                title="Remove"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addGeoRule}
                        className="mt-2 text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition flex items-center gap-2"
                    >
                        <span>+</span> Add Country
                    </button>
                </div>
            )}
        </div>
    );
}
