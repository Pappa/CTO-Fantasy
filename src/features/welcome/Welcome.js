import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setName,
  selectUser,
} from './userSlice';

export function Welcome() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, updateName] = useState("");

  if (user.name) {
    return null;
  }

  return (
    <div>
      
      <input
          aria-label="Name"
          value={name}
          onChange={e => updateName(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(setName(name))
          }
        >
          Save
        </button>
        </div>
  );
}
