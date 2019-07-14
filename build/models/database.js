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

var connectionString = process.env.NODE_ENV === 'development' ? process.env.devDb : process.env.dbUrl;
var pool = new _pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432
});
exports.pool = pool;
pool.on('connect', function () {
  console.log('Connected to db');
});