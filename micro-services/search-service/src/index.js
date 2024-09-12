const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Search Service!');
});

app.listen(port, () => {
  console.log(`Search service is running on port ${port}`);
});