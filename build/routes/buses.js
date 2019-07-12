"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _buses = _interopRequireDefault(require("../controlllers/buses"));

var _inputValidation = require("../middlewares/inputValidation");

var _userValidation = require("../middlewares/userValidation");

var router = _express["default"].Router();

router.post('/', [_userValidation.validateToken, _userValidation.checkAdmin, _inputValidation.validateBus], _buses["default"].createBus);
router.get('/', [_userValidation.validateToken, _userValidation.checkAdmin], _buses["default"].findAllBuses);
router.get('/:id', [_inputValidation.validateParam, _userValidation.validateToken, _userValidation.checkAdmin], _buses["default"].findABus);
var _default = router;
exports["default"] = _default;