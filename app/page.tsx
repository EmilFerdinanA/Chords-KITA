"use client";

import { useState } from "react";
import { transpose } from "chord-transposer";
import { replaceFlatWithSharp } from "@/utils/replaceFlatWithSharp";
import { normalizeSemitone } from "@/utils/normalizeSemitone";

export default function Home() {
  const originalChord =
    "G        C           Am7            C        D7   G/B      G\nSaying I love you is not the words I want to hear from you";
  const [semitone, setSemitone] = useState(0);

  const transposedChordRaw = transpose(originalChord)
    [semitone > 0 ? "up" : "down"](Math.abs(semitone))
    .toString(); // Hasil mentahannya

  return (
    <main>
      <h2>Chord (Transpose, hanya #):</h2>
      <div>
        <button onClick={() => setSemitone(normalizeSemitone(semitone - 1))}>
          Turun (-)
        </button>
        <span style={{ margin: "0 10px" }}>Semitone: {semitone}</span>
        <button onClick={() => setSemitone(normalizeSemitone(semitone + 1))}>
          Naik (+)
        </button>
      </div>
      <pre>{replaceFlatWithSharp(transposedChordRaw)}</pre>
    </main>
  );
}
