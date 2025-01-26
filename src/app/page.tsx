"use client";

import React, { useState } from "react";
import Input from "@/components/Input/Input";
import axios from "axios";

//TODO: Implement Color and UI for follow document

function SideInput({
  sideNumber,
  value,
  onChange,
  error,
}: {
  sideNumber: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}) {
  return (
    <div className="flex gap-4 mb-4">
      <label className="w-20 font-medium pt-2">Side {sideNumber}</label>
      <div className="flex-1">
        <Input
          type="number"
          name={`side${sideNumber}`}
          value={value}
          onChange={onChange}
          error={error}
          className="w-full p-3 bg-yellow-300 border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [sides, setSides] = useState({
    side1: "",
    side2: "",
    side3: "",
  });
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({
    side1: "",
    side2: "",
    side3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSides({
      ...sides,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      side1: sides.side1 ? "" : "Please fill out this field",
      side2: sides.side2 ? "" : "Please fill out this field",
      side3: sides.side3 ? "" : "Please fill out this field",
    };
    setErrors(newErrors);

    if (!sides.side1 || !sides.side2 || !sides.side3) {
      return;
    }

    axios
      .post("https://liam-nak-na-api-production.up.railway.app/triangle", {
        width: sides.side1,
        height: sides.side2,
        base: sides.side3,
      })
      .then((res) => {
        setResult(`${res.data.data.EnglishName} / ${res.data.data.ThaiName}`);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-indigo-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Enter the length of sides
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <SideInput
            sideNumber={1}
            value={sides.side1}
            onChange={handleChange}
            error={errors.side1}
          />
          <SideInput
            sideNumber={2}
            value={sides.side2}
            onChange={handleChange}
            error={errors.side2}
          />
          <SideInput
            sideNumber={3}
            value={sides.side3}
            onChange={handleChange}
            error={errors.side3}
          />

          <div className="flex gap-6 mt-6 text-2xl font-bold">
            <button
              type="submit"
              className="mt-10 bg-yellow-300 border-2 rounded-lg border-black px-1 py-2 h-12 hover:bg-red-100 transition-colors"
            >
              Enter
            </button>


            <div className="flex-grow p-2 text-2xl text-center">Result
            <div className="flex-1 p-1 text-sm bg-yellow-300 border-2 border-black rounded-lg h-12">
              {result}
            </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
