// server/index.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/calc', (req, res) => {
  const { expression } = req.body;
  try {
    // Caution: For demo only! Use a proper math parser in production!
    let result = eval(expression);
    res.json({ result });
  } catch {
    res.json({ result: 'Error' });
  }
});

app.post('/api/stats', (req, res) => {
  const { numbers } = req.body;
  const mean = numbers.reduce((a, b) => a + b) / numbers.length;
  const sorted = [...numbers].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0 ?
    (sorted[sorted.length/2 -1] + sorted[sorted.length/2])/2 :
    sorted[Math.floor(sorted.length/2)];
  const mode = numbers.sort((a,b) =>
    numbers.filter(v => v===a).length - numbers.filter(v => v===b).length
  ).pop();
  const stdev = Math.sqrt(meanSquare(numbers, mean));
  function meanSquare(arr, mean) { return arr.reduce((s, v) => s + Math.pow(v - mean,2),0)/arr.length;}
  res.json({ mean, median, mode, stdev });
});

app.listen(3001, () => console.log('Server running at 3001'));
