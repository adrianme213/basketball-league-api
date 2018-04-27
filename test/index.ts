const http = require('http');
const assert = require('assert');
const path = require('path');

const server = require(path.join(__dirname, '../src/index.ts'));
const serverSpecs = require(path.join(__dirname, './server.ts'));
