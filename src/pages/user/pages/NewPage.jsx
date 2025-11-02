import { useNavigate } from 'react-router-dom';

function NewPage() {
    const navigate = useNavigate();

    const services = [
        { name: 'Barangay Clearance', key: 'clearance' },
        { name: 'Business Permit', key: 'business-permit' },
        { name: 'Cedula', key: 'cedula' },
        { name: 'Certificate of Residency', key: 'residency' },
        { name: 'Indigency', key: 'indigency' },
    ];

    const handleOpen = (serviceKey) => {
        // TODO: Wire up navigation to the proper flow when available
        // Keeping simple for now, stay on page
        // Example: navigate(`/e-application/${serviceKey}`)
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center">
            <div className="w-full max-w-5xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    {/* Reminder banner */}
                    <div className="bg-[#B151FB]/90 text-white rounded-xl p-3 mb-4 shadow-md">
                        <div className="font-semibold mb-1">Reminder</div>
                        <p className="text-sm opacity-95">
                            Before proceeding, please ensure that you have provided all required
                            information in your profile.
                        </p>
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-lg font-bold text-black">Available Barangay Services</h2>
                        <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">Bonafide</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map((service, idx) => (
                            <button
                                key={service.key}
                                type="button"
                                onClick={() => handleOpen(service.key)}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all text-left p-4 flex flex-col items-center gap-3 cursor-pointer group min-h-[160px] justify-center"
                            >
                                <div className="w-16 h-16 rounded-full border border-gray-200 grid place-items-center overflow-hidden bg-white">
                                    <img
                                        src="/assets/images/mata.svg"
                                        alt="Barangay Seal"
                                        className="w-14 h-14 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-900 group-hover:text-black text-xl">
                                        {service.name}
                                    </div>
                                </div>  
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPage;