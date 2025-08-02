"use client";

import { songData } from "@/components/data";
import Lyric, { RootObject } from "@/components/Lyric";

export default function Home() {
  return (
    <main>
      <h1 className="font-bold text-xl">Chord Mangu</h1>

      <Lyric songData={songData as RootObject[]} />
    </main>
  );
}
