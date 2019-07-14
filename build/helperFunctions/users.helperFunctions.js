"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _query = _interopRequireDefault(require("./query"));

var _a = require("./a");

var UsersHelperFunctions =
/*#__PURE__*/
function () {
  function UsersHelperFunctions() {
    (0, _classCallCheck2["default"])(this, UsersHelperFunctions);
  }

  (0, _createClass2["default"])(UsersHelperFunctions, null, [{
    key: "createUser",
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(data) {
        var first_name, last_name, email, password, isAdmin, existingUser, addUserQuery, hashedPassword, values, createdUser, payload, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                first_name = data.first_name, last_name = data.last_name, email = data.email, password = data.password, isAdmin = data.isAdmin; // Check if Email exists.

                _context.next = 3;
                return UsersHelperFunctions.getUserByEmail(email);

              case 3:
                existingUser = _context.sent;

                if (!existingUser) {
                  _context.next = 6;
                  break;
                }

                throw new Error('Email already registered');

              case 6:
                // Create a new user
                addUserQuery = "INSERT INTO users(first_name, last_name, email, password, is_admin) \n        VALUES($1, $2, $3, $4, $5) returning *";
                _context.prev = 7;
                _context.next = 10;
                return (0, _a.hashPassword)(password);

              case 10:
                hashedPassword = _context.sent;
                values = [first_name, last_name, email, hashedPassword, isAdmin];
                _context.next = 14;
                return (0, _query["default"])(addUserQuery, values);

              case 14:
                createdUser = _context.sent;
                payload = {
                  userId: createdUser[0].user_id,
                  isAdmin: isAdmin,
                  email: email
                };
                _context.next = 18;
                return (0, _a.generateToken)(payload);

              case 18:
                token = _context.sent;
                return _context.abrupt("return", (0, _objectSpread2["default"])({
                  token: token
                }, createdUser[0]));

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](7);
                throw new Error(_context.t0);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 22]]);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "getUserByEmail",
    value: function () {
      var _getUserByEmail = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(email) {
        var queryText, users;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryText = 'SELECT * FROM users WHERE email = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _query["default"])(queryText, [email]);

              case 4:
                users = _context2.sent;
                return _context2.abrupt("return", users[0]);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                throw new Error(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function getUserByEmail(_x2) {
        return _getUserByEmail.apply(this, arguments);
      }

      return getUserByEmail;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(user, id) {
        var queryText;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _a.verifyUser)(user, id);
                queryText = 'SELECT * FROM users WHERE user_id = $1';
                _context3.prev = 2;
                _context3.next = 5;
                return (0, _query["default"])(queryText, [id]);

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);
                throw new Error(_context3.t0.message);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 8]]);
      }));

      function getUserById(_x3, _x4) {
        return _getUserById.apply(this, arguments);
      }

      return getUserById;
    }()
  }]);
  return UsersHelperFunctions;
}();

var _default = UsersHelperFunctions;
exports["default"] = _default;