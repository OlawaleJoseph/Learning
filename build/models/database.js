"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

/* eslint-disable import/prefer-default-export */
_dotenv["default"].config();

var connectionString;

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.testDb;
} else {
  connectionString = process.env.devDb;
}

var pool = new _pg.Pool({
  connectionString: connectionString
});
exports.pool = pool;
pool.on('connect', function () {
  console.log(process.env.NODE_ENV);
  console.log(connectionString);
  console.log('Connected to db');
});