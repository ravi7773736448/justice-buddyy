import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Loader2, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: "bot",
      message:
        "Hello! I'm Justice Buddy. I can help you with legal questions in your local language. What legal issue would you like guidance on today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("en-US");
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const quickActions = [
    "Land dispute",
    "Wage problem",
    "Pension issue",
    "Domestic violence",
    "Property rights",
    "Government schemes",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isLoading]);

  const speakMessage = (text, lang) => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((v) => v.lang === lang) || voices[0];
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const typeMessage = async (fullMessage, lang) => {
    let index = 0;
    const tempMsg = { type: "bot", message: "" };
    setConversation((prev) => [...prev, tempMsg]);

    while (index < fullMessage.length) {
      tempMsg.message += fullMessage[index];
      setConversation((prev) => [...prev.slice(0, -1), { ...tempMsg }]);
      index++;
      await new Promise((resolve) => setTimeout(resolve, 15));
    }

    speakMessage(fullMessage, lang);
  };

  const handleSendMessage = async (msg = message, lang = detectedLanguage) => {
    if (!msg.trim()) return;

    const newConversation = [...conversation, { type: "user", message: msg }];
    setConversation(newConversation);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, language: lang }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || `Server returned status ${response.status}`;
        setConversation([
          ...newConversation,
          { type: "bot", message: `⚠️ Error: ${errorMsg}` },
        ]);
        return;
      }

      const reply = data.reply || "⚠️ No reply from AI";
      await typeMessage(reply, lang);
    } catch (error) {
      console.error("Network or fetch error:", error);
      setConversation([
        ...newConversation,
        { type: "bot", message: `⚠️ Network error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => handleSendMessage(action);

  const toggleRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const lang = event.results[0][0].language || "en-US";
        setDetectedLanguage(lang);
        setMessage(transcript);
        handleSendMessage(transcript, lang);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => setIsRecording(false);

      recognition.start();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4 flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ask Justice Buddy</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Get legal advice in your local language instantly
            </p>
          </div>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition"
            title="Go to Home"
          >
            <Home className="h-5 w-5" />
          </button>
        </motion.div>

        {/* Chat Box */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl whitespace-pre-line ${
                    msg.type === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  } shadow`}
                >
                  {msg.message}
                </motion.div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl flex items-center text-gray-600 shadow">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" /> Justice Buddy is typing...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-3 mt-4">
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full flex items-center justify-center ${
                isRecording
                  ? "bg-red-500 text-white"
                  : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
              } transition`}
            >
              <Mic className="h-5 w-5" />
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your legal issue..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner"
              onKeyDown={(e) =>
                e.key === "Enter" && handleSendMessage(message, detectedLanguage)
              }
            />

            <button
              onClick={() => handleSendMessage(message, detectedLanguage)}
              className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition shadow"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
