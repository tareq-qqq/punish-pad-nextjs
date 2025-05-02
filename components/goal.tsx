import { Separator } from "./ui/separator";

const Goal = ({
  phrase,
  repetitions,
  owner,
  punished,
}: {
  phrase: string;
  repetitions: number;
  owner: string;
  punished: string;
}) => {
  return (
    <div className="mb-6 space-y-2 text-center">
      <h1 className="text-foreground text-xl font-semibold sm:text-2xl">
        <span className="text-muted-foreground text-2xl sm:text-3xl">
          {owner}
        </span>{" "}
        <span className="text-foreground font-medium">commands</span> that{" "}
        <span className="decoration-destructive text-2xl underline decoration-2 sm:text-3xl">
          {punished}
        </span>{" "}
        must write
      </h1>

      <p className="text-2xl font-bold sm:text-3xl">
        “<span className="text-destructive">{phrase}</span>”{" "}
        <span className="ml-2 px-3 py-1 text-2xl">{repetitions} times</span>
      </p>

      <Separator className="mx-auto my-4 max-w-9/10" />
    </div>
  );
};

export default Goal;
