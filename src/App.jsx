import React, { useState } from "react";

const App = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [error, setError] = useState("");

    const backendUrl = "https://bajaj-ycbu.onrender.com/bfhl";

    const validateJson = (input) => {
        try {
            const parsed = JSON.parse(input);
            return parsed && Array.isArray(parsed.data);
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async () => {
        setError("");
        setResponseData(null);

        if (!validateJson(jsonInput)) {
            setError("Invalid JSON format! Ensure it follows: { \"data\": [\"A\", \"1\"] }");
            return;
        }

        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: jsonInput,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setResponseData(result);
        } catch (error) {
            setError("Failed to fetch data from backend. Check console.");
            console.error("Fetch error:", error);
        }
    };

    const getFilteredData = () => {
        if (!responseData) return null;
        const { numbers, alphabets, highest_alphabet } = responseData;
        let filtered = {};
        if (selectedFilters.includes("Numbers")) filtered.numbers = numbers;
        if (selectedFilters.includes("Alphabets")) filtered.alphabets = alphabets;
        if (selectedFilters.includes("Highest Alphabet")) filtered.highest_alphabet = highest_alphabet;
        return filtered;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full text-black">
                <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Backend JSON Processor</h1>
                <textarea
                    className="w-400 h-48 p-4 border rounded-md focus:ring focus:ring-blue-400"
                    placeholder='Enter JSON, e.g., { "data": ["A", "1", "B"] }'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                />
                <br/>
                <button
                    className="mt-3 w-full px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <br/>
                <br/>
                {error && <p className="text-red-500 mt-2 text-center font-semibold">{error}</p>}
                {responseData && (
                    <div className="mt-6">
                        <label className="block mb-2 font-semibold">Filter Data (Click on below category to get results) : <br/> <br/></label>
                        <select
                            multiple
                            className="w-full border p-3 rounded-md"
                            value={selectedFilters}
                            onChange={(e) =>
                                setSelectedFilters([...e.target.selectedOptions].map((o) => o.value))
                            }
                        >
                            <option value="Numbers">Numbers</option>
                            <option value="Alphabets">Alphabets</option>
                            <option value="Highest Alphabet">Highest Alphabet</option>
                        </select>
                    </div>
                )}
                {responseData && (
                    <div className="mt-6 w-full p-6 border rounded-md bg-gray-100 text-black">
                        <h2 className="text-xl font-semibold mb-2 text-blue-600">Response Data:</h2>
                        <pre className="bg-gray-200 p-4 rounded-md text-sm">
                            {JSON.stringify(getFilteredData(), null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;