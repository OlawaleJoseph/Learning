"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _trips = _interopRequireDefault(require("../controlllers/trips"));

var _inputValidation = require("../middlewares/inputValidation");

var _userValidation = require("../middlewares/userValidation");

var router = _express["default"].Router();

router.post('/', [_inputValidation.validateTrip, _userValidation.validateToken, _userValidation.checkAdmin], _trips["default"].createTrip);
router.get('/', [_inputValidation.validateQuery, _userValidation.validateToken], _trips["default"].findAllTrips);
router.get('/:id', [_inputValidation.validateParam, _userValidation.validateToken], _trips["default"].findATrip);
router.patch('/:id', [_inputValidation.validateParam, _userValidation.validateToken, _userValidation.checkAdmin], _trips["default"].updateTripStatus);
var _default = router;
exports["default"] = _default;