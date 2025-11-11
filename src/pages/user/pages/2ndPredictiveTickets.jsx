import { useState } from 'react';

function CrimePreventionReport() {
    // BACKEND: Replace with actual API data
    const reportData = {
        title: "Ito ang ulat kontra kriminalidad at paghahanda sa bawat sakuna",
        automated: true,
        description: "Alamin ang takbo ng trapiko sa bawat oras mula sa nasasakupan ng ating barangay. Ito ay base sa mga nakukuhang data mula sa mga naka filed na reklamo at maging sa mga incident reports para sa ating barangay. Gagamitin din mga uli ng incident reports at ano ang inaasang mapipigilan na intelligence sa mga prevensions na ibinalita ng ating kalsada!",
        seeInsightsUrl: "/insights",
        chartData: {
            title: "Next Hour - Most Frequent Threats",
            subtitle: "Predicted crime rates and disaster incidents (past hour 3 months)",
            viewAllUrl: "/view-all",
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crimeData: [45, 38, 42, 35, 40, 32, 28, 25, 30, 27, 24, 22],
            disasterData: [12, 15, 18, 14, 16, 13, 10, 8, 11, 9, 7, 6]
        }
    };

    const sections = [
        {
            id: 1,
            type: "info",
            badges: ["Advocacy"],
            title: "Last 3 months",
            content: [
                "Noong nakaraang umbot (6) na buwan, malaking bawas ang naitala nating kabosuang incidente. Natubo tilaada hahay sa kabusuang kakosing inavap. Nitong ultimo nito ng pagipbit na planta ng ano sa naibait sa pagbitin ng maiping habayan na eto ng inaasahan ng pananggalun sa naka filing ng bilotto report sa ating barangay.",
                "Inaasahan na tatanong si banlaan (5) buwan sa inaasang malabswang habung tampapalaya ang regular monitoring bawat linggo."
            ]
        },
        {
            id: 2,
            type: "prediction",
            badges: ["Prediction", "Advocacy"],
            title: "Last 3 months mas madami ang natulat na may kinalaman sa sunog",
            content: [
                "Sa incident report, may nabyang 450 blotter sa loob ng tatlong buwan (Jan-March) kung saan ito ay tinawag sa mobile at kada loob ng babasahin ng mangaing laiwin ang nakadang reklamo. Ito ay may malalaking relasyon din sa mga season temperatures.",
                "Amado ka rekomendasyon ng Artificial Intelligence ang abbot barangay sa panagalayin na labong labis na nag monitor sa buwan busing kunwanrumente na incident.",
                "Kaamutan naman na MO koloon na nabilai sa loob ng tatlong (3) meses na may noblest ang staff mina ko natin pagipbit laypat. So aiding byungong.",
                "Kaamutan naman sa MO koloon ng nalulai sa loob ng tatlong (3) meses sa may incident ang staff kailta.",
                "Hindi po ng papayag nakaan sa nagsasalig kabinatlas maging binissy sa pinagmulan na isa labang ang byung tumusuong.",
                "Instrukas ang barangay-level awareness programs tungkol sa crime prevention at disaster preparedness.",
                "Dagdagan ang man-against-coordination sa pagitan ng barangay, PNP, BFP, at health centers"
            ]
        }
    ];

    const TrendingDown = () => (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
    );

    const maxValue = Math.max(...reportData.chartData.crimeData, ...reportData.chartData.disasterData);

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                        <h1 className="text-2xl font-bold text-gray-900 flex-1">
                            {reportData.title}
                        </h1>
                        {reportData.automated && (
                            <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ml-4 flex-shrink-0">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                Automated
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {reportData.description}
                    </p>
                </div>

                {/* Chart Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{reportData.chartData.title}</h2>
                            <p className="text-sm text-gray-500">{reportData.chartData.subtitle}</p>
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
                            {reportData.chartData.months.map((month, index) => {
                                const crimeHeight = (reportData.chartData.crimeData[index] / maxValue) * 100;
                                const disasterHeight = (reportData.chartData.disasterData[index] / maxValue) * 100;
                                
                                return (
                                    <div key={month} className="flex-1 flex flex-col items-center gap-1 relative group">
                                        <div className="w-full flex gap-1 items-end h-full">
                                            <div 
                                                className="flex-1 bg-indigo-200 rounded-t hover:bg-indigo-300 transition-colors"
                                                style={{ height: `${crimeHeight}%` }}
                                            />
                                            <div 
                                                className="flex-1 bg-purple-200 rounded-t hover:bg-purple-300 transition-colors"
                                                style={{ height: `${disasterHeight}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* X-axis labels */}
                        <div className="ml-8 mt-2 flex justify-between text-xs text-gray-400">
                            {reportData.chartData.months.map(month => (
                                <span key={month} className="flex-1 text-center">{month}</span>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
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
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-900">24%</div>
                                    <div className="text-xs text-gray-500">Crime Rate</div>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                                    <TrendingDown />
                                    -12%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                {sections.map((section) => (
                    <div 
                        key={section.id}
                        className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg mb-6"
                    >
                        <div className="flex flex-wrap gap-2 mb-4">
                            {section.badges.map((badge, index) => (
                                <span 
                                    key={index}
                                    className="bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full font-medium"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        
                        <div className="space-y-4">
                            {section.content.map((paragraph, index) => (
                                <p key={index} className="text-indigo-100 text-sm leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CrimePreventionReport;