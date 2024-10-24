import { useState } from "react";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const add = (numbers) => {
    if (numbers === "") return 0;

    let delimiter = ",";
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      delimiter = parts[0].substring(2);
      numbers = parts.slice(1).join("\n");
    }

    const numArray = numbers.split(new RegExp(`[${delimiter}\n]`)).map(Number);
    const negatives = numArray.filter((num) => num < 0);

    if (negatives.length > 0) {
      throw new Error("negative numbers not allowed: " + negatives.join(", "));
    }

    return numArray.reduce((acc, num) => acc + num, 0);
  };
  const calculate = () => {
    setError(null);
    setResult(null);
    try {
      const total = add(input);
      setResult(total.toString());
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="main-container">
      <h1>String Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
        className="input-main"
      />
      <button onClick={calculate}>Add</button>
      {result !== null && <p className="final-result-txt">Result: {result}</p>}
      {error && <p className="error-main">{error}</p>}
    </div>
  );
}

export default StringCalculator;
