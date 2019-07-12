"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("./routes/users"));

var _buses = _interopRequireDefault(require("./routes/buses"));

var _trips = _interopRequireDefault(require("./routes/trips"));

var _bookings = _interopRequireDefault(require("./routes/bookings"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use('/api/v1/auth', _users["default"]);
app.use('/api/v1/buses', _buses["default"]);
app.use('/api/v1/trips', _trips["default"]);
app.use('/api/v1/bookings', _bookings["default"]);
app.get('/api/v1', function (req, res) {
  res.send('Welcome to Way Farer');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App is listening on Port ".concat(port));
});
var _default = app;
exports["default"] = _default;