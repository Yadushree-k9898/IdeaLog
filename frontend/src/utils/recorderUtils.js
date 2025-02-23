export const startRecording = async (setRecorderState) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    let chunks = [];
  
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };
  
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: "audio/wav" });
      setRecorderState({ audioBlob, recording: false });
    };
  
    mediaRecorder.start();
    setRecorderState({ recording: true });
  
    return mediaRecorder;
  };
  
  export const stopRecording = (mediaRecorder) => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };
  