const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Rooms Service!');
});

app.listen(port, () => {
  console.log(`Rooms service is running on port ${port}`);
});