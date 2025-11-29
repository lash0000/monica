import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowUp,
  FaComments,
  FaImage,
  FaPaperclip,
  FaTimes,
  FaTimesCircle,
  FaDownload,
} from "react-icons/fa";

function formatDateTime(date) {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function TelekonsultaChatStandalone() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Expect the same shape as in TelekonsultaDetail
  const appointment = location.state?.appointment || null;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isPatientTyping] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() && attachments.length === 0) return;

    const adminMessage = {
      id: Date.now(),
      text: inputText,
      sender: "admin",
      timestamp: new Date(),
      attachments: attachments.map((att) => ({ ...att })),
    };

    setMessages((prev) => [...prev, adminMessage]);
    setInputText("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    setAttachments([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const handleAttachmentSelect = (event, type) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const freshAttachments = files.map((file) => {
      const preview = type === "image" ? URL.createObjectURL(file) : null;
      return {
        id: crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,
        type,
        name: file.name,
        preview,
        file,
      };
    });

    setAttachments((prev) => [...prev, ...freshAttachments]);

    if (event.target) {
      event.target.value = "";
    }
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => {
      const updated = prev.filter((att) => att.id !== id);
      const removed = prev.find((att) => att.id === id);
      if (removed?.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const handleDownloadAttachment = (attachment) => {
    if (!attachment) return;
    let url = attachment.preview;
    let shouldRevoke = false;

    if (!url && attachment.file) {
      url = URL.createObjectURL(attachment.file);
      shouldRevoke = true;
    }

    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.download = attachment.name || "attachment";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (shouldRevoke) {
      URL.revokeObjectURL(url);
    }
  };

  const openImagePreview = (attachment) => {
    if (!attachment?.preview) {
      handleDownloadAttachment(attachment);
      return;
    }
    setPreviewAttachment(attachment);
  };

  const closeImagePreview = () => setPreviewAttachment(null);

  if (!appointment) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EFEFEF" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white" style={{ borderColor: "#EFEFEF" }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition text-sm"
              style={{ color: "#001E61" }}
            >
              <FaArrowLeft />
            </button>
            <div>
              <p className="text-lg font-semibold text-gray-900">Chat</p>
              <p className="text-xs text-gray-500">
                Appointment not found (ID: {id})
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md text-center space-y-3">
            <p className="text-gray-600 text-sm">
              Appointment data is missing. Please open this chat from a valid
              telekonsulta appointment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#EFEFEF" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b bg-white"
        style={{ borderColor: "#EFEFEF" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition text-sm"
            style={{ color: "#001E61" }}
          >
            <FaArrowLeft />
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#50589C", opacity: 0.1 }}
            >
              <FaComments style={{ color: "#50589C" }} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Chat with {appointment?.userName || "Patient"}
              </h2>
              <p className="text-xs text-gray-500">
                Appointment: {appointment?.id || formatDateTime(appointment?.scheduledAt)}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full transition"
          style={{ color: "#001E61" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#EFEFEF")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{ backgroundColor: "#EFEFEF" }}
      >
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#50589C", opacity: 0.1 }}
            >
              <FaComments className="text-2xl" style={{ color: "#50589C" }} />
            </div>
            <p className="text-gray-600 text-sm">
              Start a conversation with{" "}
              {appointment?.userName || "the patient"}
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "patient" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 text-xs font-semibold">
                  {appointment?.patient?.firstName?.slice(0, 1) || "P"}
                </span>
              </div>
            )}
            <div
              className="max-w-[75%] rounded-2xl px-4 py-3"
              style={
                message.sender === "admin"
                  ? { backgroundColor: "#50589C", color: "#FFFFFF" }
                  : {
                      backgroundColor: "#FFFFFF",
                      borderColor: "#EFEFEF",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      color: "#001E61",
                    }
              }
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>

              {message.attachments?.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="rounded-xl text-xs cursor-pointer"
                      style={
                        attachment.type === "image"
                          ? {
                              border: "none",
                              backgroundColor: "transparent",
                              padding: "0",
                            }
                          : {
                              border: "1px solid #50589C",
                              backgroundColor: "#50589C",
                              color: "#FFFFFF",
                              padding: "8px",
                            }
                      }
                      onClick={() =>
                        attachment.type === "image"
                          ? openImagePreview(attachment)
                          : handleDownloadAttachment(attachment)
                      }
                    >
                      {attachment.type === "image" && attachment.preview ? (
                        <div className="space-y-1">
                          <img
                            src={attachment.preview}
                            alt={attachment.name}
                            className="w-full max-h-40 object-cover rounded-lg"
                            style={{ border: "none", outline: "none" }}
                          />
                          <p
                            className="font-semibold truncate px-2"
                            style={{
                              color:
                                message.sender === "admin"
                                  ? "#FFFFFF"
                                  : "#001E61",
                              paddingTop: "4px",
                            }}
                          >
                            {attachment.name}
                          </p>
                        </div>
                      ) : (
                        <p className="font-semibold truncate flex items-center gap-2">
                          <FaPaperclip className="text-sm" />
                          {attachment.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {message.sender === "admin" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#50589C", opacity: 0.1 }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#50589C" }}
                >
                  A
                </span>
              </div>
            )}
          </div>
        ))}

        {isPatientTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600 text-xs font-semibold">
                {appointment?.patient?.firstName?.slice(0, 1) || "P"}
              </span>
            </div>
            <div
              className="rounded-2xl px-4 py-3"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#EFEFEF",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        className="px-6 py-4 border-t bg-white"
        style={{ borderColor: "#EFEFEF" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div
              className="rounded-xl px-4 py-3"
              style={{
                borderColor: "#EFEFEF",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-3">
                  {attachments.map((attachment) => (
                    <div key={attachment.id}>
                      {attachment.type === "image" && attachment.preview ? (
                        <div
                          className="relative cursor-pointer"
                          onClick={() => openImagePreview(attachment)}
                        >
                          <img
                            src={attachment.preview}
                            alt={attachment.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            style={{ border: "none", outline: "none" }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAttachment(attachment.id);
                            }}
                            className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1"
                            style={{ color: "#001E61" }}
                          >
                            <FaTimesCircle />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-2 rounded-full px-3 py-1 text-xs cursor-pointer"
                          style={{
                            backgroundColor: "#EFEFEF",
                            color: "#001E61",
                          }}
                          onClick={() =>
                            handleDownloadAttachment(attachment)
                          }
                        >
                          <span>
                            <FaPaperclip className="inline mr-1" />
                            {attachment.name}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAttachment(attachment.id);
                            }}
                            className="focus:outline-none"
                          >
                            <FaTimesCircle />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={`Type a message to ${
                  appointment?.userName || "patient"
                }...`}
                rows={1}
                className="w-full resize-none text-sm"
                style={{
                  border: "none",
                  outline: "none",
                  maxHeight: "120px",
                  minHeight: "48px",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="p-2.5 rounded-lg transition"
              style={{ color: "#001E61" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#EFEFEF")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={() => imageInputRef.current?.click()}
            >
              <FaImage className="w-4 h-4" />
            </button>
            <button
              className="p-2.5 rounded-lg transition"
              style={{ color: "#001E61" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#EFEFEF")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={() => fileInputRef.current?.click()}
            >
              <FaPaperclip className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() && attachments.length === 0}
              className="p-2.5 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#50589C" }}
              onMouseEnter={(e) =>
                !e.currentTarget.disabled &&
                (e.currentTarget.style.backgroundColor = "#001E61")
              }
              onMouseLeave={(e) =>
                !e.currentTarget.disabled &&
                (e.currentTarget.style.backgroundColor = "#50589C")
              }
            >
              <FaArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {previewAttachment?.preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeImagePreview}
          />
          <div className="relative z-10 max-w-3xl w-full mx-4">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={previewAttachment.preview}
                alt={previewAttachment.name}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
                  onClick={() => handleDownloadAttachment(previewAttachment)}
                >
                  <FaDownload className="text-gray-700" />
                </button>
                <button
                  className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
                  onClick={closeImagePreview}
                >
                  <FaTimes className="text-gray-700" />
                </button>
              </div>
              <div className="p-4 text-sm text-gray-700">
                {previewAttachment.name}
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        className="hidden"
        onChange={(e) => handleAttachmentSelect(e, "image")}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleAttachmentSelect(e, "file")}
      />
    </div>
  );
}

export default TelekonsultaChatStandalone;


