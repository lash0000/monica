import { useState } from 'react';

function PredictiveTickets() {
    const [selectedYear, setSelectedYear] = useState('2024');

    // Icon components
    const TrendingDown = () => (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
    );

    const TrendingUp = () => (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );

    // Sample data for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const crimeData = [45, 38, 42, 35, 40, 32, 28, 25, 30, 27, 24, 22];
    const disasterData = [12, 15, 18, 14, 16, 13, 10, 8, 11, 9, 7, 6];

    const maxValue = Math.max(...crimeData, ...disasterData);

    const stats = [
        { label: 'Crime Rate', value: '24%', trend: 'down', change: '-12%' },
        { label: 'Disaster Incidents', value: '6', trend: 'down', change: '-50%' },
        { label: 'Response Time', value: '8 min', trend: 'down', change: '-3 min' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="lg:max-w-[1024px] mx-auto lg:container">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Ito ang ulat kontra kriminalidad at paghahanda sa bawat sakuna
                            </h1>
                            <span className="inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                                Automated
                            </span>
                        </div>
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            Refresh
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                        Ito ay base sa mga nakukuhang data mula sa mga naka filed na reklamo at maging sa mga incident reports para sa ating barangay. Gagamitin din mga uli ng incident reports at ano ang inaasang mong ina (AMI) na intelligence sa mga prevensions na ibinanalita ng ating kalsada!
                    </p>
                </div>

                {/* Chart Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transition-all duration-200 hover:shadow-xl hover:scale-[1.01]">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Next Hour - Most Frequent Threats</h2>
                            <p className="text-sm text-gray-500">Predicted crime rates and disaster incidents (past hour 3 months)</p>
                        </div>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                            View 3 months →
                        </button>
                    </div>

                    {/* Chart */}
                    <div className="relative h-64 mb-4">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
                            <span>{maxValue}</span>
                            <span>{Math.floor(maxValue * 0.75)}</span>
                            <span>{Math.floor(maxValue * 0.5)}</span>
                            <span>{Math.floor(maxValue * 0.25)}</span>
                            <span>0</span>
                        </div>

                        {/* Chart area */}
                        <div className="ml-8 h-full flex items-end justify-between gap-1 border-b border-gray-200 pb-8">
                            {months.map((month, index) => {
                                const crimeHeight = (crimeData[index] / maxValue) * 100;
                                const disasterHeight = (disasterData[index] / maxValue) * 100;
                                
                                return (
                                    <div key={month} className="flex-1 flex flex-col items-center gap-1 relative group">
                                        {/* Bars */}
                                        <div className="w-full flex gap-1 items-end h-full">
                                            <div 
                                                className="flex-1 bg-indigo-200 rounded-t hover:bg-indigo-300 transition-colors relative"
                                                style={{ height: `${crimeHeight}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    Crime: {crimeData[index]}
                                                </div>
                                            </div>
                                            <div 
                                                className="flex-1 bg-purple-200 rounded-t hover:bg-purple-300 transition-colors relative"
                                                style={{ height: `${disasterHeight}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    Disaster: {disasterData[index]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* X-axis labels */}
                        <div className="ml-8 mt-2 flex justify-between text-xs text-gray-400">
                            {months.map(month => (
                                <span key={month} className="flex-1 text-center">{month}</span>
                            ))}
                        </div>
                    </div>

                    {/* Legend and Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-indigo-400 rounded"></div>
                                <span className="text-sm text-gray-600">Crime Incidents</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-400 rounded"></div>
                                <span className="text-sm text-gray-600">Disasters</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
                                        <div className="text-xs text-gray-500">{stat.label}</div>
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.trend === 'down' ? <TrendingDown /> : <TrendingUp />}
                                        {stat.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Last 3 Months Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg mb-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer">
                    <span className="inline-block bg-white bg-opacity-20 text-indigo-700 text-xs px-3 py-1 rounded-full mb-4 font-medium">
                        Advocacy
                    </span>
                    <h2 className="text-3xl font-bold mb-4">Last 3 months</h2>
                    <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                        Noong nakaraang anim (6) na buwan, malaking bawas ang naitala nating kabusuang incidente. Nitong ultimo nito sa pagpihit ng planta ng ano ay naibait sa pagbitin ng masiping labanan na ako ng inaasahan ng pananggalun sa naka filing no bilotto report sa ating barangay.
                    </p>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                        Inaasahan na tatanong si Dahilan (5) Buwan sa inaasang malabswang halang tampapalaya ang regular monitoring bawat linggo.
                    </p>
                </div>

                {/* Two Column Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Prediction */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer">
                        <span className="inline-block bg-white bg-opacity-20 text-indigo-700 text-xs px-3 py-1 rounded-full mb-4 font-medium">
                            Prediction
                        </span>
                        <h3 className="text-2xl font-bold mb-4">
                            Last 3 months mas madami ang natulat na may kinalaman sa sunog
                        </h3>
                        <div className="space-y-4 text-sm text-purple-100 leading-relaxed">
                            <p>
                                Sa incident report, may nabyang 450 blotter sa loob ng tatlong buwan (Jan-March) kung saan ito ay tinawag sa mobile at kada loob ng babasahin ng mangaing laiwin ang nakadarng reklamo. Ito ay may malalaking relasyon din sa mga season temperatures.
                            </p>
                            <p>
                                Aminado ka rekomendasyon ng Artifical Intelligence ang abot barangay sa panagalayin na labong labis na nag monitor sa buwan busing kumwanrumente na incident.
                            </p>
                            <p>
                                At dahil din sa tamang siyasat na proteksyon na kaninang tulong barangay kung klaro ngayon, ulist muna sa may lagad sa labali inutil ng ating borangs. Pangalayan naman ang flamet na ginagawa na ang safety regulation sa buong barangay.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Measures */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.01] cursor-pointer">
                        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full mb-4 font-medium">
                            Measures
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ano ang plano ng brgy sa pag loob ng kaso na may tumawag ang oras?
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Kami naman ay may lagad na liga sa ating barangay na lang barangay sa encouragelain an na green ang mga kriminallidad:
                            </p>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Upscaling ang barangay-level awareness programs tungkol sa crime prevention at disaster preparedness</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Dagdagan ang man-against-coordination sa pagitan ng barangay, PNP, BFP, at health centers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Magtayo ng regular safety drills at evacuation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PredictiveTickets;