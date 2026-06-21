const jwt = require('jsonwebtoken');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

const env = dotenv.parse(fs.readFileSync(path.join(__dirname, '../../cli/.env.e2e.test')));

const keyId = env.ASC_KEY_ID;
const issuerId = env.ASC_ISSUER_ID;
let privateKey = env.ASC_PRIVATE_KEY;

// Remove quotes and fix newlines
privateKey = privateKey.replace(/^"|"$/g, '').replace(/\\n/g, '\n');

const timestamp = Math.floor(Date.now() / 1000);
const expiration = timestamp + (15 * 60);

const payload = {
  iss: issuerId,
  iat: timestamp,
  exp: expiration,
  aud: 'appstoreconnect-v1'
};

const options = {
  algorithm: 'ES256',
  header: {
    alg: 'ES256',
    kid: keyId,
    typ: 'JWT'
  }
};

const token = jwt.sign(payload, privateKey, options);
console.log(token);
