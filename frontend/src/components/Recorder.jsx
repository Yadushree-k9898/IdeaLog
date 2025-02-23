
import React, { useState, useRef } from "react";
import { Mic } from "lucide-react";

const Recorder = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    // Initialize Speech Recognition API
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcribed Text:", transcript);
      if (onTranscription) {
        onTranscription(transcript); // Pass text to parent
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="relative flex justify-end items-center mt-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all shadow-md ${
          recording ? "bg-red-500 text-white" : "bg-white border border-gray-300"
        }`}
      >
        <Mic size={20} />
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default Recorder;
