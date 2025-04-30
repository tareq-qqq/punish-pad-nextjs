import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen max-w-4xl">
      <div className="space-y-20 px-4 pt-[30vh] pb-4">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-balance text-gray-900 md:text-5xl">
            Welcome to Punish Pad
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 md:text-xl">
            Keep them writing until you&apos;re satisfied.
          </p>
        </div>

        <div className="flex justify-end md:pr-10">
          <Button size="lg" className="cursor-pointer px-8 text-lg" asChild>
            <Link href="/create-room">
              Create Room <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
