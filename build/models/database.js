"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

_dotenv["default"].config();

var connectionString = process.env.NODE_ENV === 'development' ? process.env.devDb : process.env.dbUrl;
var pool = new _pg.Pool({
  connectionString: connectionString
});
exports.pool = pool;
pool.on('connect', function () {
  console.log('Connected to db');
});