import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Mic } from "lucide-react";

const Recorder = ({ onUpdate }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaStreamRef = useRef(null); // Track the media stream

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let newTranscript = transcript;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript + " ";
      }
      setTranscript(newTranscript.trim());
      if (onUpdate) onUpdate({ transcript: newTranscript.trim() });
    };

    recognition.onerror = (event) => console.error("Speech recognition error:", event.error);
    recognitionRef.current = recognition;
    recognition.start();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaStreamRef.current = stream; // Store media stream for cleanup
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        if (onUpdate) onUpdate({ transcript, audioBlob });

        // Clean up media stream
        stream.getTracks().forEach((track) => track.stop());
      };
    });

    setRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`p-2 rounded-full transition-all ${recording ? "bg-red-500 text-white" : "bg-gray-200"}`}
      >
        <Mic size={20} />
      </button>
    </div>
  );
};
Recorder.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default Recorder;
