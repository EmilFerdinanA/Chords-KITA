"use client";

import { songData } from "@/components/data";
import Lyric, { RootObject } from "@/components/Lyric";
import { Menu, Search } from "lucide-react";

export default function Home() {
  return (
    <main>
      <ul className="flex justify-center mt-2">
        <li className="border-r pr-2">Home</li>
        <li className="pl-2">Daftar isi</li>
      </ul>
      <hr className="opacity-25 my-2" />
      <h1 className="font-bold text-center text-6xl">ChordKita</h1>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Menu size={40} />

        <input
          type="text"
          placeholder="Search"
          className="m-auto border-2 p-2 border-white rounded-lg w-full"
        />
        <Search size={40} />
      </div>
      <hr className="opacity-25 my-4" />

      <h2 className="text-4xl font-bold mb-4">
        Chord Gitar Four Twenty - Mangu
      </h2>
      <hr className="opacity-25" />

      <Lyric songData={songData as RootObject[]} />
    </main>
  );
}
