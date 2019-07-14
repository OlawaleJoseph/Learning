"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _query = _interopRequireDefault(require("./query"));

var _bus = _interopRequireDefault(require("./bus"));

var TripHelperFunctions =
/*#__PURE__*/
function () {
  function TripHelperFunctions() {
    (0, _classCallCheck2["default"])(this, TripHelperFunctions);
  }

  (0, _createClass2["default"])(TripHelperFunctions, null, [{
    key: "createTrip",
    value: function () {
      var _createTrip = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(body) {
        var origin, destination, trip_date, fare, bus_id, bus, newTripQuery, createdTrip, _createdTrip$, trip_completed, trip;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                origin = body.origin, destination = body.destination, trip_date = body.trip_date, fare = body.fare, bus_id = body.bus_id;
                _context.prev = 1;
                _context.next = 4;
                return _bus["default"].findBusById(bus_id);

              case 4:
                bus = _context.sent;

                if (bus.available) {
                  _context.next = 7;
                  break;
                }

                throw new Error('The bus with the given Id is on another trip');

              case 7:
                newTripQuery = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare, status, trip_completed) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
                _context.next = 10;
                return (0, _query["default"])(newTripQuery, [bus_id, origin.toUpperCase(), destination.toUpperCase(), trip_date, fare, 'active', false]);

              case 10:
                createdTrip = _context.sent;
                _context.next = 13;
                return _bus["default"].updateBusAvailability(bus_id);

              case 13:
                _createdTrip$ = createdTrip[0], trip_completed = _createdTrip$.trip_completed, trip = (0, _objectWithoutProperties2["default"])(_createdTrip$, ["trip_completed"]);
                return _context.abrupt("return", trip);

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](1);
                throw new Error(_context.t0.message);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 17]]);
      }));

      function createTrip(_x) {
        return _createTrip.apply(this, arguments);
      }

      return createTrip;
    }()
  }, {
    key: "findTrip",
    value: function () {
      var _findTrip = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(id) {
        var findOneTripQuery, trip;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findOneTripQuery = 'SELECT * FROM trips WHERE trip_id = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _query["default"])(findOneTripQuery, [id]);

              case 4:
                trip = _context2.sent;

                if (trip[0]) {
                  _context2.next = 7;
                  break;
                }

                throw new Error('Trip not Found');

              case 7:
                return _context2.abrupt("return", trip[0]);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                throw new Error(_context2.t0.message);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }));

      function findTrip(_x2) {
        return _findTrip.apply(this, arguments);
      }

      return findTrip;
    }()
  }, {
    key: "getAlltrips",
    value: function () {
      var _getAlltrips = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var alltripsQuery, trips;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                alltripsQuery = 'SELECT * FROM trips';
                _context3.prev = 1;
                _context3.next = 4;
                return (0, _query["default"])(alltripsQuery);

              case 4:
                trips = _context3.sent;
                return _context3.abrupt("return", trips.map(function (trip) {
                  var trip_completed = trip.trip_completed,
                      status = trip.status,
                      tripObj = (0, _objectWithoutProperties2["default"])(trip, ["trip_completed", "status"]);
                  return tripObj;
                }));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                throw new Error(_context3.t0.message);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      function getAlltrips() {
        return _getAlltrips.apply(this, arguments);
      }

      return getAlltrips;
    }()
  }, {
    key: "updateTripStatus",
    value: function () {
      var _updateTripStatus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(id) {
        var trip, newStatus, updateTripQuery, updatedTrip;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return TripHelperFunctions.findTrip(id);

              case 3:
                trip = _context4.sent;

                if (trip) {
                  _context4.next = 8;
                  break;
                }

                throw new Error('Trip not found');

              case 8:
                newStatus = trip.status === 'active' ? 'cancelled' : 'active';
                updateTripQuery = 'UPDATE trips SET status=$1 WHERE trip_id=$2 returning *';
                _context4.prev = 10;
                _context4.next = 13;
                return (0, _query["default"])(updateTripQuery, [newStatus, id]);

              case 13:
                updatedTrip = _context4.sent;
                _context4.next = 16;
                return _bus["default"].updateBusAvailability(updatedTrip[0].bus_id);

              case 16:
                return _context4.abrupt("return", updatedTrip);

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](10);
                throw new Error('Could not update trip');

              case 22:
                _context4.next = 27;
                break;

              case 24:
                _context4.prev = 24;
                _context4.t1 = _context4["catch"](0);
                throw new Error(_context4.t1.message);

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 24], [10, 19]]);
      }));

      function updateTripStatus(_x3) {
        return _updateTripStatus.apply(this, arguments);
      }

      return updateTripStatus;
    }()
  }, {
    key: "updateTripSuccess",
    value: function () {
      var _updateTripSuccess = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(id) {
        var tripToUpdate, tripToUpdateQuery, updatedTrip;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                tripToUpdate = TripHelperFunctions.findTrip(id);
                tripToUpdateQuery = 'UPDATE trips SET trip_completed=$1 WHERE trip_id=$2 returning *';
                _context5.prev = 2;
                _context5.next = 5;
                return (0, _query["default"])(tripToUpdateQuery, [!tripToUpdate.tripCompleted, id]);

              case 5:
                updatedTrip = _context5.sent;
                return _context5.abrupt("return", updatedTrip);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](2);
                throw new Error('Trip not found');

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 9]]);
      }));

      function updateTripSuccess(_x4) {
        return _updateTripSuccess.apply(this, arguments);
      }

      return updateTripSuccess;
    }()
  }, {
    key: "filterTrips",
    value: function filterTrips(params, data) {
      var origin = params.origin,
          destination = params.destination;

      if (origin && destination) {
        origin = origin.toUpperCase();
        destination = destination.toUpperCase();
        return data.filter(function (item) {
          return item.origin === origin && item.destination === destination;
        });
      }

      if (origin) {
        origin = origin.toUpperCase();
        return data.filter(function (item) {
          return item.origin === origin;
        });
      }

      destination = destination.toUpperCase();
      return data.filter(function (item) {
        return item.destination === destination;
      });
    }
  }, {
    key: "pickBus",
    value: function () {
      var _pickBus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6() {
        var buses, availableBuses, randomNumber, bus;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _bus["default"].findAllBuses();

              case 2:
                buses = _context6.sent;
                availableBuses = buses.filter(function (bus) {
                  return bus.available;
                });

                if (!(availableBuses.length < 1)) {
                  _context6.next = 6;
                  break;
                }

                throw new Error('No available Bus for this trip');

              case 6:
                randomNumber = Math.floor(Math.random() * availableBuses.length);
                bus = availableBuses[randomNumber];
                return _context6.abrupt("return", bus.bus_id);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function pickBus() {
        return _pickBus.apply(this, arguments);
      }

      return pickBus;
    }()
  }]);
  return TripHelperFunctions;
}();

var _default = TripHelperFunctions;
exports["default"] = _default;