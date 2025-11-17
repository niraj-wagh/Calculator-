// src/Calculator.js
import React, { useState } from 'react';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [statsData, setStatsData] = useState('');
  const [statsResult, setStatsResult] = useState({});

  const handleInput = (val) => setInput((prev) => prev + val);
  const clear = () => { setInput(''); setResult(''); };

  const calculate = async () => {
    // For backend: Use fetch to send expression to Node/PHP/Java API
    const res = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression: input }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  const calcStats = async () => {
    // Example stats API call (for mean, median, mode, stdev)
    const arr = statsData.split(',').map(Number);
    const res = await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numbers: arr }),
    });
    const data = await res.json();
    setStatsResult(data);
  };

  return (
    <div id="calc-container">
      <div>{input || '0'}</div>
      <div>Result: {result}</div>
      <div className="calc-row">
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('+')}>+</button>
      </div>
      {/* Add more buttons for all operations */}
      <button onClick={calculate}>=</button>
      <button onClick={clear}>C</button>
      <hr/>
      <div>
        <p>Statistics (comma-separated numbers):</p>
        <input value={statsData} onChange={(e) => setStatsData(e.target.value)} />
        <button onClick={calcStats}>Calculate Stats</button>
        {statsResult.mean && <div>Mean: {statsResult.mean}</div>}
        {statsResult.median && <div>Median: {statsResult.median}</div>}
        {/* Add more stats fields */}
      </div>
    </div>
  );
}
export default Calculator;
