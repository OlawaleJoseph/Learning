"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bookings = _interopRequireDefault(require("../controlllers/bookings"));

var _inputValidation = require("../middlewares/inputValidation");

var _userValidation = require("../middlewares/userValidation");

var router = (0, _express["default"])();
router.post('/', [_userValidation.validateToken, _inputValidation.validateBooking], _bookings["default"].createBooking);
router.get('/:id', [_inputValidation.validateParam, _userValidation.validateToken], _bookings["default"].findABooking);
router.get('/', _userValidation.validateToken, _bookings["default"].findAllBookings);
router.patch('/:id', [_inputValidation.validateParam, _userValidation.validateToken], _bookings["default"].updateSeat);
router["delete"]('/:id', [_userValidation.validateToken], _bookings["default"].deleteBooking);
var _default = router;
exports["default"] = _default;