"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function TestAPIPage() {
  const [message, setMessage] = useState("");

  const callAPI = async () => {
    try {
      const response = await api.get("/ping");
      setMessage(response.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error connecting to API");
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      <button
        onClick={callAPI}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Call Backend
      </button>
      {message && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-gray-800">{message}</p>
        </div>
      )}
    </div>
  );
}