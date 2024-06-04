import { MouseEvent, MouseEventHandler } from "react";

type Props = {
  type: "plus" | "minus";
  action: MouseEventHandler;
};

const Button: React.FC<Props> = ({ type, action }) => {
  return (
    <button
      onClick={action}
      className="flex items-center justify-center rounded-lg w-1/4 h-full text-3xl text-white bg-black"
    >
      {type === "plus" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            fillRule="evenodd"
            d="M12 3.25a.75.75 0 0 1 .75.75v7.25H20a.75.75 0 0 1 0 1.5h-7.25V20a.75.75 0 0 1-1.5 0v-7.25H4a.75.75 0 0 1 0-1.5h7.25V4a.75.75 0 0 1 .75-.75"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            fillRule="evenodd"
            d="M4.85 11.25h14.302a.75.75 0 1 1 0 1.5H4.85a.75.75 0 0 1 0-1.5"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};
export default Button;
