import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

type Props = {
  id: number;
  count: number;
  color: string;
  updateCounter: Function;
  setCanPoll: Function;
};

const CounterFront: React.FC<Props> = ({
  id,
  count,
  color,
  updateCounter,
  setCanPoll,
}) => {
  const containerRef = useRef(null);
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);
  const batchDiff = useRef<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as HTMLDivElement).style.backgroundColor = color;
    }
  }, []);

  const updateCount = (difference: number) => {
    fetch(`/api/counter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diff: difference,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setCanPoll(true);
        return response.json();
      })
      .catch((error) => {
        console.error("Error updating the count: ", error);
      });
  };

  const handleClick = (diff: number) => {
    const newCount = count + diff;
    updateCounter(id, newCount);
    batchDiff.current += diff;

    if (updateTimeout.current) {
      setCanPoll(false);
      clearTimeout(updateTimeout.current);
    }

    updateTimeout.current = setTimeout(() => {
      updateCount(batchDiff.current);
      batchDiff.current = 0;
    }, 500);
  };

  return (
    <div
      className="flex justify-evenly items-center w-4/5 lg:w-1/3 h-[4.5rem] lg:h-20 gap-2 bg-slate-900 p-2 rounded-xl drop-shadow-lg text-base lg:text-xl"
      ref={containerRef}
    >
      <Button
        type="minus"
        action={() => {
          handleClick(-1);
        }}
      />
      <span
        className={`w-1/2 h-full rounded-lg bg-gray-800 content-center text-center`}
      >
        {count}
      </span>
      <Button
        type="plus"
        action={() => {
          handleClick(1);
        }}
      />
    </div>
  );
};

export default CounterFront;
