import React from "react";

type Props = {
  value: string;
  setValue: Function;
  className: string;
};

const InputColor: React.FC<Props> = ({ value, setValue, className }) => {
  const hexCharacters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  const handleColorInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (
      !hexCharacters.includes(event.target.value.slice(-1)) ||
      event.target.value.length >= 6
    )
      return;
    setValue(event.target.value);
  };

  return (
    <div className={`flex flex-row w-full rounded-lg ${className}`}>
      <div className="flex items-center justify-center h-full aspect-square">
        <input
          className="size-full lg:size-5/6 rounded-lg p-3 bg-transparent"
          type="color"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name=""
          id=""
        />
      </div>
      <input
        className="w-3/4 focus:outline-none bg-transparent"
        type="text"
        value={value}
        onChange={(e) => handleColorInput(e)}
        name=""
        id=""
      />
    </div>
  );
};
export default InputColor;
