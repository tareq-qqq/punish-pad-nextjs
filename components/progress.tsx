import socket from "@/lib/socket";
import { useEffect, useState } from "react";
import { Progress as ProgressBar } from "./ui/progress";

const Progress = ({
  initialHits,
  initialMisses,
  total,
}: {
  initialHits: number;
  initialMisses: number;
  total: number;
}) => {
  const [hitsAndMisses, setHitsAndMisses] = useState<{
    hits: number;
    misses: number;
  }>({ hits: initialHits, misses: initialMisses });

  const { hits, misses } = hitsAndMisses;
  const accuracy = (hits / total) * 100;

  useEffect(() => {
    socket.on("phrase-submitted", (hits: number, misses: number) => {
      setHitsAndMisses({ hits, misses });
    });
  }, []);

  return (
    <div className="space-y-2 px-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center">Hits: {hits}</div>
        <div className="flex items-center justify-center">Misses: {misses}</div>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
        <ProgressBar value={accuracy} className="mt-1 h-2" />
        <p className="text-muted-foreground text-xs font-medium">
          {accuracy.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default Progress;
