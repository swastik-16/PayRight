import React from 'react';
import Avatar from './Avatar';

export default function NavBar({ name }) {
  return (
    <div className="flex justify-between p-4 bg-green-100 items-center">
      <div className="text-2xl font-bold">
        Pay<span className="text-green-700">Ease</span>
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Avatar n={name[0]} />
        <div className="text-lg">{name}</div>
      </div>
    </div>
  );
}
