const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from users Service!');
});

app.listen(port, () => {
  console.log(`users service is running on port ${port}`);
});