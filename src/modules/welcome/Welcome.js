import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function Welcome() {
  const dispatch = useDispatch();
  const [name, updateName] = useState("");

  return (
    <div>
      <input
        aria-label="Name"
        value={name}
        onChange={(e) => updateName(e.target.value)}
      />
      <button onClick={() => {}}>Save</button>
    </div>
  );
}
