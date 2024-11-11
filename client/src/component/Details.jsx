import React from "react";

function Details({ name, part_name, select }) {
    return (
        <div className="mb-4">
            {/* <h2 className="text-lg font-semibold ">{name}</h2> */}
            <h2 className="text-xl font-semibold bg-black text-white p-2 border border-gray-300 w-full text-center">
                {name}
            </h2>
            {Object.keys(part_name[select]).map((key, index) => (
                <p key={index}><span className="font-bold text-xl">{key}</span>: <span className="text-xl text-wrap">{part_name[select][key]}</span></p>
            ))}
        </div>
    );
}

export default Details;