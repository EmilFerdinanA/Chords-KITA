"use client";

import { useState } from "react";
import { songData } from "@/components/data";
import Lyric from "@/components/Lyric";

export default function Home() {
  const [semitone, setSemitone] = useState(0);

  return (
    <main>
      <h2>Chord Mangu - 420 (Transpose, hanya #):</h2>
      <div>
        <button onClick={() => setSemitone((prev) => prev - 1)}>
          Turun (-)
        </button>
        <span style={{ margin: "0 10px" }}>Semitone: {semitone}</span>
        <button onClick={() => setSemitone((prev) => prev + 1)}>
          Naik (+)
        </button>
      </div>

      <Lyric songData={songData} keyOffset={semitone} />
    </main>
  );
}
