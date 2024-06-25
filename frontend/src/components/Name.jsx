import React from 'react';
import Avatar from './Avatar2';
import { useNavigate } from 'react-router-dom';

export default function Name({ name, id }) {
  const navigate=useNavigate();
  return (
    <div className="flex items-center gap-2">
      <Avatar n={name[0]} />
      <div className="text-lg">{name}</div>
      <button onClick={
          ()=>{
      navigate(`/send?to=${id}&name=${name}`);
          }
      }className="bg-green-500 text-white text-md font-medium px-2 py-1 rounded-full shadow">
        Send
      </button>
    </div>
  );
}
