import React from 'react';

export default function Avatar({ n }) {
    return (
        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mb-1">
            <span className="font-medium text-green-700">{n}</span>
        </div>
    );
}
