"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input || input.length === 0) {
        setResult(undefined);
        return;
      }

      const reach = await fetch(
        `https://zenitsu.psykat.workers.dev/api/search?q=${input}`,
        {
          method: "GET",
        }
      );
      const data = await reach.json();

      setResult(data as { results: string[]; duration: number });
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-full w-full grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-6xl tracking-tight font-bold">Zenitsu ⚡</h1>
        <p className="text-zinc-600 text-xl max-w-prose text-center capitalize">
          Zenitsu, A High Performance API Built With <b>Redis</b>,{" "}
          <b>Cloudfare Workers</b>, <b>Hono JS</b>
          <br /> Type a query below and get your results in miliseconds.
        </p>
        <div className="w-full max-w-md">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search Countries..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {result?.results.length === 0 ? (
                <CommandEmpty>
                  No results found for{" "}
                  <span className="text-primary">{input}</span>
                </CommandEmpty>
              ) : null}
              {result && result.results ? (
                <CommandGroup heading="Results">
                  {result?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={setInput}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {result?.results && (
                <>
                  <div className="h-px w-full bg-zinc-200" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {result.results.length} results in{" "}
                    {result.duration.toFixed(0)}ms
                  </p>
                </>
              )}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
