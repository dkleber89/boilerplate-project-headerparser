// server.js
// where your node app starts

// init project
import express from 'express';
import cors from 'cors';
import { gDirname } from './utils/utilityFunctions.mjs';

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(`${gDirname(import.meta.url)}/views/index.html`);
});

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, res) => {
  res.json({
    ipadress: req.header('x-forwarded-for') || req.connection.remoteAddress,
    language: req.header('accept-language'),
    software: req.header('user-agent'),
  });
});

// listen for requests :)
const port = process.env.PORT || 3000;

const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
