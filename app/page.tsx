"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { SiMongodb, SiRedis } from "react-icons/si";

export default function Home() {
  const [selected, setSelected] = useState<"redis" | "mongodb">("redis");
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

      let reach;

      if (selected === "redis") {
        reach = await fetch(
          `${process.env.BACKEND_URL}/api/search?q=${input}`,
          {
            method: "GET",
          }
        );
      } else {
        reach = await fetch(`/api/find?q=${input}`, {
          method: "GET",
        });
      }
      const data = await reach.json();

      setResult(data as { results: string[]; duration: number });
    };

    fetchData();
  }, [input, selected]);

  return (
    <main className="h-full w-full grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-6xl tracking-tight font-bold">Zenitsu ⚡</h1>
        <p className="text-zinc-600 text-xl max-w-prose text-center capitalize">
          Zenitsu, A High Performance API Built With <b>Redis</b>,{" "}
          <b>Cloudfare Workers</b>, <b>Hono JS</b>
          <br /> Type a query below and get your results in miliseconds.
        </p>
        <div className="flex gap-5 items-center">
          <Button
            variant={selected === "redis" ? "default" : "outline"}
            onClick={() => setSelected("redis")}
          >
            <SiRedis className="h-7 w-7" />
          </Button>
          <Button
            variant={selected === "mongodb" ? "default" : "outline"}
            onClick={() => setSelected("mongodb")}
          >
            <SiMongodb className="h-7 w-7" />
          </Button>
        </div>
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
