import socket from "@/lib/socket";
import { useEffect, useState } from "react";

const Progress = ({
  initialHits,
  initialMisses,
}: {
  initialHits: number;
  initialMisses: number;
}) => {
  const [hitsAndMisses, setHitsAndMisses] = useState<{
    hits: number;
    misses: number;
  }>({ hits: initialHits, misses: initialMisses });

  const { hits, misses } = hitsAndMisses;

  useEffect(() => {
    socket.on("phrase-submitted", (hits: number, misses: number) => {
      setHitsAndMisses({ hits, misses });
    });
  }, []);
  return (
    <div>
      <div>
        <p>hits and misses</p>
        <p>hits: {hits}</p>
        <p>misses: {misses}</p>
      </div>
    </div>
  );
};
export default Progress;
