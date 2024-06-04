import { MouseEventHandler, useState } from "react";
import InputColor from "./InputColor";
import styles from "./styles.module.css";
type Props = {
  addCounter: Function;
};
const AddCounter: React.FC<Props> = ({ addCounter }) => {
  const [color, setColor] = useState<string>("#ffffff");
  return (
    <div
      className={`flex flex-col lg:flex-row items-center w-4/5 lg:w-1/2 h-32 lg:h-28 gap-2 p-2 bg-indigo-700 rounded-xl text-lg lg:text-xl ${styles["drop-shadow-pink"]}`}
    >
      <InputColor
        value={color}
        setValue={setColor}
        className="h-1/2 lg:h-full bg-none bg-stone-800"
      ></InputColor>
      <button
        className="h-1/2 lg:h-full w-full bg-stone-800 rounded-lg disabled:bg-stone-400"
        disabled={!color}
        onClick={() => {
          addCounter(color);
        }}
      >
        Add counter
      </button>
    </div>
  );
};

export default AddCounter;
