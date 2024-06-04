"use client";
import AddCounter from "@/components/AddCounter";
import CounterFront from "@/components/CounterFront";
import { Counter } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [canPoll, setCanPoll] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!canPoll) return;
    getCounters();
    intervalRef.current = setInterval(getCounters, 10000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [canPoll]);

  const updateCounter = (id: number, newCount: number) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, count: newCount } : counter
      )
    );
  };

  const getCounters = async () => {
    if (!canPoll) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    fetch("/api/counter", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Counter[]) => {
        setCounters(data.sort((a, b) => a.id - b.id));
      })
      .catch((error) => {
        console.error("Error creating counter:", error);
      });
  };

  const addCounter = (color: string) => {
    setCounters((prevState) => [
      ...prevState,
      { id: counters[counters.length - 1].count + 10, count: 0, color },
    ]);
    if (counters.length >= 10) return;
    fetch("/api/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: color,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        getCounters();
      })
      .catch((error) => {
        console.error("Error creating counter:", error);
      });
  };

  return (
    <div className="size-full flex flex-col gap-8 lg:gap-8 items-center">
      <h1 className="text-5xl lg:text-7xl mt-5 lg:mt-8 text-black font-semibold">
        Counters App
      </h1>
      <AddCounter addCounter={addCounter}></AddCounter>
      <div className="flex items-center justify-center flex-col lg:flex-row gap-3 flex-1 h-full w-full flex-wrap">
        {counters.map((counter, index) => (
          <CounterFront
            key={index}
            id={counter.id}
            count={counter.count}
            color={counter.color}
            updateCounter={updateCounter}
            setCanPoll={setCanPoll}
          ></CounterFront>
        ))}
      </div>
    </div>
  );
}
