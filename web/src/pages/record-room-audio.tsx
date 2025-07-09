import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
  roomId: string
}

const isRecordingSupported =
  !!navigator.mediaDevices
  && typeof navigator.mediaDevices.getUserMedia === 'function'
  && typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  async function stopRecording() {
    setIsRecording(false)

    if(recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if(intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    console.log(result)
  }

  async function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64000
    })

    recorder.current.ondataavailable = event => {
      if(event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada')
    }

    recorder.current.onstop = () => {
      console.log('Gravação encerrada')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if(!isRecordingSupported) {
      alert('Navegador não suporta gravação')
      return
    }
    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()

      createRecorder(audio)
    }, 5000);
  }

  return (
    <div className="h-screen flex items-center justify-center gap-3">
      { isRecording ? (
        <Button onClick={stopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar Áudio</Button>
      )
      }
      { isRecording ? <p>Gravando...</p> : <p>Pausado</p> }
    </div>
  )
}