import { Link } from "react-router-dom";

function SuccessModal({ isOpen, onClose, title, message, subMessage, actionText, actionLink }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl p-8 max-w-md mx-4 shadow-2xl border border-white border-opacity-20">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        </div>
        
        {/* Message Content */}
        <div className="text-center mb-8">
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            {message}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            {subMessage}
          </p>
          <p className="text-foreground font-semibold text-1g">
            Welcome to our platform!
          </p>
        </div>
        
        {/* Action Button */}
        <div className="flex justify-center">
          <Link to={actionLink}>
            <button
              onClick={onClose}
              className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-hover transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {actionText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
