export function replaceFlatWithSharp(chordText: string) {
  return chordText
    .replace(/\bAb/g, "G#")
    .replace(/\bBb/g, "A#")
    .replace(/\bCb/g, "B")
    .replace(/\bDb/g, "C#")
    .replace(/\bEb/g, "D#")
    .replace(/\bFb/g, "E")
    .replace(/\bGb/g, "F#");
}
