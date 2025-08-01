"use client";
import { useState } from "react";
import { transpose } from "chord-transposer";

// Fungsi untuk mengganti chord flat ke sharp
function replaceFlatWithSharp(chordText: string) {
  return chordText
    .replace(/\bAb/g, "G#")
    .replace(/\bBb/g, "A#")
    .replace(/\bCb/g, "B")
    .replace(/\bDb/g, "C#")
    .replace(/\bEb/g, "D#")
    .replace(/\bFb/g, "E")
    .replace(/\bGb/g, "F#");
}

// Fungsi normalisasi semitone
function normalizeSemitone(n: number) {
  let result = n;
  while (result > 11) result -= 12;
  while (result < -11) result += 12;
  return result;
}

export default function Home() {
  const originalChord =
    "G        C           Am7            C        D7   G/B      G\nSaying I love you is not the words I want to hear from you";
  const [semitoneRaw, setSemitoneRaw] = useState(0);

  const semitone = normalizeSemitone(semitoneRaw);

  const transposedChordRaw = transpose(originalChord)
    [semitone > 0 ? "up" : "down"](Math.abs(semitone))
    .toString(); // Hasil mentahannya
  const transposedChord = replaceFlatWithSharp(transposedChordRaw); // Membuat jadi sharp

  return (
    <main>
      <h2>Chord (Transpose, hanya #):</h2>
      <div>
        <button
          onClick={() => setSemitoneRaw(normalizeSemitone(semitoneRaw - 1))}
        >
          Turun (-)
        </button>
        <span style={{ margin: "0 10px" }}>Semitone: {semitone}</span>
        <button
          onClick={() => setSemitoneRaw(normalizeSemitone(semitoneRaw + 1))}
        >
          Naik (+)
        </button>
      </div>
      <pre>{transposedChord}</pre>
    </main>
  );
}
