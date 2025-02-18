import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="string h-[200px] w-[100%]">
      <svg className="bg-red-400" width="500" height="160">
        <path d="M 10 80 Q 225 10 490 80" stroke="black" fill="transparent" />
      </svg>
    </div>
  );
}
