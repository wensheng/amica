import { config } from '@/utils/config';

export async function PiperTTS(
  message: string,
) {

  try {
    const res = await fetch(`${config("piper_tts_url")}/tts`, {
      method: "POST",
      body: JSON.stringify({
        input: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (! res.ok) {
      console.error(res);
      throw new Error("Piper TTS API Error");
    }
    const data = (await res.arrayBuffer()) as any;

    return { audio: data };
  } catch (e) {
    console.error('ERROR', e);
    throw new Error("Piper TTS API Error");
  }
}
