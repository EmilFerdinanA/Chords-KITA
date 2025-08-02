"use client";
import React, { useState } from "react";

export interface RootObject {
  label?: string;
  chord: string;
  lyric?: string;
}

export default function Lyric({ songData }: { songData: RootObject[] }) {
  const [semitone, setSemitone] = useState(0);

  const transposedChord = songData.map((line) => ({
    label: line.label || "",
    chord: line.chord ? transposeChordLine(line.chord, semitone) : "",
    lyric: line.lyric || "",
  }));

  return (
    <>
      <div>
        <button
          onClick={() => setSemitone((prev) => (((prev - 1) % 12) + 12) % 12)}
        >
          Turun (-)
        </button>
        <span style={{ margin: "0 10px" }}>Semitone: {semitone}</span>
        <button
          onClick={() => setSemitone((prev) => (((prev + 1) % 12) + 12) % 12)}
        >
          Naik (+)
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {transposedChord?.map((line, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            {/* {line.chord && ( */}
            <div>
              <pre
                style={{
                  margin: 0,
                  color: "yellow",
                  fontWeight: 600,
                  whiteSpace: "pre-wrap",
                }}
              >
                {line.label && (
                  <div className="text-white font-bold">{line.label} :</div>
                )}
                {line.chord}
              </pre>
            </div>
            {/* )} */}
            {line.lyric && <div>{line.lyric}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

// Daftar nada dalam satu oktaf (menggunakan notasi sharp)
const CHORDS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

/**
 * Mengubah chord dengan notasi flat (b) menjadi notasi sharp (#) yang setara.
 * Contoh: Db -> C#, Eb -> D#, dll.
 */
function normalizeChord(chord: string) {
  return chord
    .replace(/Db/g, "C#")
    .replace(/Eb/g, "D#")
    .replace(/Gb/g, "F#")
    .replace(/Ab/g, "G#")
    .replace(/Bb/g, "A#");
}

/**
 * Melakukan transpose terhadap satu chord, termasuk menangani:
 * - Chord dasar dan kompleks (Am, Cmaj7, F#m7b5, dll)
 * - Slash chord (G/B, D/F#)
 * - Bass chord seperti "Am" pada "G/Am" akan dianggap hanya "A"
 *
 * @param chord - String chord yang akan ditranspose
 * @param offset - Jumlah semitone untuk transpose (positif naik, negatif turun)
 * @returns Chord baru yang sudah ditranspose
 */
function transposeChord(chord: string, offset: number): string {
  // Regex untuk memecah chord jadi: root, suffix (seperti m7, sus4), dan bass (jika ada)
  const regex = /^([A-G](#|b)?)([^/]*)?(\/([A-Ga-g](#|b)?)[a-z0-9]*)?$/;

  const match = chord.match(regex);
  if (!match) return chord;

  // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
  let [_, root, , suffix, , bass] = match;

  root = normalizeChord(root);
  const rootIndex = CHORDS.indexOf(root);
  if (rootIndex === -1) return chord; // Root tidak ditemukan, kembalikan apa adanya

  const newRoot = CHORDS[(rootIndex + offset + 12) % 12];
  let newBass = "";

  if (bass) {
    // Ambil nada awal dari bass (misalnya dari "Am" jadi "A", dari "G#" tetap "G#")
    bass = normalizeChord(
      bass[0].toUpperCase() +
        (bass[1] === "#" || bass[1] === "b" ? bass[1] : "")
    );
    const bassIndex = CHORDS.indexOf(bass);
    if (bassIndex >= 0) {
      newBass = "/" + CHORDS[(bassIndex + offset + 12) % 12];
    }
  }

  return newRoot + (suffix || "") + newBass;
}

/**
 * Melakukan transpose terhadap satu baris chord penuh,
 * sambil mempertahankan spasi/spasi ganda di antara chord agar tetap rapi.
 *
 * Contoh input:
 *   "G         C           D/F#"
 *   dengan offset 2
 *   hasil: "A         D           E/G#"
 *
 * @param chordLine - Baris chord asli
 * @param offset - Jumlah semitone yang ingin digeser
 * @returns Baris chord yang sudah ditranspose (format tetap)
 */
function transposeChordLine(chordLine: string, offset: number): string {
  // Ambil semua token chord atau spasi
  const tokens = chordLine.match(
    /([A-G][#b]?[^ \t\/]*\/?[A-Ga-g#b0-9]*)|[\s]+/g
  );
  if (!tokens) return chordLine;

  return tokens
    .map((token) =>
      /^\s+$/.test(token) ? token : transposeChord(token, offset)
    )
    .join("");
}
