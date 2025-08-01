import { replaceFlatWithSharp } from "@/utils/replaceFlatWithSharp";
import { transpose } from "chord-transposer";
import React from "react";

export default function Lyric({ songData, keyOffset = 0 }) {
  const semitoneOffset = ((keyOffset % 12) + 12) % 12;

  const transposedChordRaw = songData.map((line) => ({
    label: line.label || "",
    chord: line.chord
      ? transpose(line.chord).up(semitoneOffset).toString()
      : "",
    lyric: line.lyric || "",
  }));

  const transposedChord = transposedChordRaw.map((line) => ({
    ...line,
    chord: line.chord ? replaceFlatWithSharp(line.chord) : "",
  }));

  return (
    <div style={{ marginTop: 20 }}>
      {transposedChord?.map((line, idx) => (
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
  );
}
