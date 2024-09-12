const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Monitoring Service!');
});

app.listen(port, () => {
  console.log(`Notifications service is running on port ${port}`);
});