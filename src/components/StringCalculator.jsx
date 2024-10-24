import { useState } from "react";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  function add(numbers) {
    if (numbers === "") return 0;

    let delimiter = [",", ";"];
    if (numbers.includes("\\")) {
      const parts = numbers.split("\\n");
      numbers = parts.join("\n");
    }
    // debugger;
    const numArray = numbers

      .split(new RegExp(`[${delimiter}\\n]`))
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));
    console.log(numArray, "numArrayRes");
    const negatives = numArray.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error("Negative numbers not allowed: " + negatives.join(", "));
    }
    return numArray.reduce((acc, num) => acc + num, 0);
  }

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
