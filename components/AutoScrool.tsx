"use client";

import React, { useEffect, useRef, useState } from "react";

const speedMap: Record<number, number> = {
  1: 90, // paling lambat
  2: 50,
  3: 20,
  4: 10,
  5: 1, // paling cepat
};

const AutoScroll = () => {
  const [speed, setSpeed] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hapus interval sebelumnya
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (speed !== null) {
      intervalRef.current = setInterval(() => {
        window.scrollBy(0, 0.5); // Scroll 1px ke bawah tiap interval
      }, speedMap[speed]);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [speed]);

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-80 text-white py-2 rounded-l-lg shadow-lg z-50 w-[70px]">
      <div className="text-sm mb-2 text-center text-gray-300 font-semibold">
        Speed
      </div>
      {[5, 4, 3, 2, 1].map((s) => (
        <div
          key={s}
          onClick={() => setSpeed(s)}
          className={`w-5 h-5 mx-auto mb-2 cursor-pointer rounded-full border-2 transition ${
            speed === s
              ? "bg-white border-white"
              : "border-gray-400 hover:bg-gray-300"
          }`}
        />
      ))}
      <div
        onClick={() => setSpeed(null)}
        className="text-center mt-3 text-red-500 text-sm cursor-pointer hover:underline"
      >
        Stop
      </div>
    </div>
  );
};

export default AutoScroll;
