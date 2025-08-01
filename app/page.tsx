"use client";

import { useState } from "react";
import { transpose } from "chord-transposer";
import { normalizeSemitone } from "@/utils/normalizeSemitone";

const songData = [
  { chord: "Am  Em  G  D", lyric: "hoo..wo..", label: "Reff" },
  { chord: "Am  Em  G  D", lyric: "hoo..wo.." },
  { chord: "G                Dm", lyric: "gila.. tak masuk logika.." },
  { chord: "Am", lyric: "termangu hatiku.." },
  {
    chord: "Em           D        G",
    lyric: "kau menggenggam ku menadahnya..",
  },
  {
    chord: "G         C           G",
    lyric: "berdamai dengan apa yang terjadi..",
  },
  { chord: "G         C        D", lyric: "kunci dari semua masalah ini.." },
  { chord: "Am", lyric: "jujur tak.." },
  { chord: "Em                G", lyric: "mudah untuk melang..kah pergi.." },
  {
    chord: "Am         Em      D",
    lyric: "ini soal hati bukan yang diyakini..",
  },
  { chord: "G                Dm", lyric: "oh.. gila.. tak masuk logika.." },
  { chord: "Am", lyric: "termangu hatiku.." },
  { chord: "Em           D        G", lyric: "kau menggenggam ku menadahnya" },
  { chord: "" },
  { chord: "G                Dm", lyric: "oh gila.. ini tak biasa.." },
  { chord: "Am", lyric: "tertegun hatiku.." },
  {
    chord: "Em           D        (Am)",
    lyric: "kau menggenggam ku menadahnya..",
  },
  { chord: "" },
  { chord: "  Am  Em  G  D", lyric: "hoo..wo.." },
  { chord: "Am        Em  G  D", lyric: "ho ooo.. hoo oo.." },
];

export default function Home() {
  const [semitone, setSemitone] = useState(0);

  const transposedChordRaw = songData.map((line) => {
    return {
      ...line,
      chord: line.chord
        ? transpose(line.chord)
            [semitone > 0 ? "up" : "down"](Math.abs(semitone))
            .toString()
        : "",
      lyric: line.lyric || "",
    };
  });

  return (
    <main>
      <h2>Chord Mangu - 420 (Transpose, hanya #):</h2>
      <div>
        <button onClick={() => setSemitone(normalizeSemitone(semitone - 1))}>
          Turun (-)
        </button>
        <span style={{ margin: "0 10px" }}>Semitone: {semitone}</span>
        <button onClick={() => setSemitone(normalizeSemitone(semitone + 1))}>
          Naik (+)
        </button>
      </div>
      <div style={{ marginTop: 20 }}>
        {transposedChordRaw.map((line, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            {line.chord && (
              <div>
                <pre style={{ margin: 0, color: "crimson", fontWeight: 600 }}>
                  {line.label && (
                    <span className="text-white font-bold">{line.label}: </span>
                  )}
                  {line.chord}
                </pre>
              </div>
            )}
            {line.lyric && <div>{line.lyric}</div>}
          </div>
        ))}
      </div>
    </main>
  );
}
