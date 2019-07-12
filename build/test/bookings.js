"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _users = _interopRequireDefault(require("../helperFunctions/users.helperFunctions"));

var _bus = _interopRequireDefault(require("../helperFunctions/bus"));

var _trips = _interopRequireDefault(require("../helperFunctions/trips.helperFunctions"));

var _query = _interopRequireDefault(require("../helperFunctions/query"));

var _bookings = _interopRequireDefault(require("../helperFunctions/bookings.helperFunctions"));

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

var assert = _chai["default"].assert;
describe('BOOKING', function () {
  var user1;
  var user2;
  var admin;
  var bus;
  var tripObj;
  var trip;
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var user1Obj, user2Obj, adminObj, busObj;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user1Obj = {
              first_name: 'Dele',
              last_name: 'Sesan',
              email: 'delesesan@yahoo.com',
              password: 'password123',
              isAdmin: false
            };
            user2Obj = {
              first_name: 'John',
              last_name: 'Doe',
              email: 'johndoe@yahoo.com',
              password: 'password',
              isAdmin: false
            };
            adminObj = {
              first_name: 'Wale',
              last_name: 'Deko',
              email: 'waledeko@wayfarer.com',
              password: 'password123',
              isAdmin: true
            };
            busObj = {
              manufacturer: 'Toyota',
              year: 2016,
              model: 'Hiace',
              capacity: 42,
              number_plate: 'APP-248HK'
            };
            _context.next = 6;
            return _users["default"].createUser(user1Obj);

          case 6:
            user1 = _context.sent;
            _context.next = 9;
            return _users["default"].createUser(user2Obj);

          case 9:
            user2 = _context.sent;
            _context.next = 12;
            return _users["default"].createUser(adminObj);

          case 12:
            admin = _context.sent;
            _context.next = 15;
            return _bus["default"].createBus(busObj);

          case 15:
            bus = _context.sent;
            tripObj = {
              origin: 'Lekki',
              destination: 'CMS',
              fare: 200,
              trip_date: '12/07/2019 15:30:00',
              bus_id: bus.bus_id
            };
            _context.next = 19;
            return _trips["default"].createTrip(tripObj);

          case 19:
            trip = _context.sent;

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _query["default"])('DELETE FROM users');

          case 2:
            _context2.next = 4;
            return (0, _query["default"])('DELETE FROM buses');

          case 4:
            _context2.next = 6;
            return (0, _query["default"])('DELETE FROM trips');

          case 6:
            _context2.next = 8;
            return (0, _query["default"])('DELETE FROM bookings');

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe('Create Booking', function () {
    it('Should create a new Booking',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var newBooking, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              newBooking = {
                trip_id: trip.trip_id,
                seat_number: 3
              };
              _context3.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/bookings').set('x-access-token', user1.token).send(newBooking);

            case 3:
              res = _context3.sent;
              assert.equal(res.status, 201, 'Status code should b 201 if a booking is created');
              assert.equal(res.body.status, 'success');
              assert.hasAllKeys(res.body.data, ['booking_id', 'trip_id', 'bus_id', 'trip_date', 'fare', 'user_id', 'seat_number', 'last_name', 'first_name', 'email']);
              assert.equal(user1.user_id, res.body.data.user_id);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should create new booking with a random seat number if seat_number is not provided',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai["default"].request(_index["default"]).post('/api/v1/bookings').set('x-access-token', user1.token).send({
                trip_id: trip.trip_id
              });

            case 2:
              res = _context4.sent;
              assert.equal(res.status, 201, 'Status code should b 201 if a booking is created');
              assert.equal(res.body.status, 'success');
              assert.hasAllKeys(res.body.data, ['booking_id', 'trip_id', 'bus_id', 'trip_date', 'fare', 'user_id', 'seat_number', 'last_name', 'first_name', 'email']);
              assert.equal(user1.user_id, res.body.data.user_id);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should return an error if trip id is not specified',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _chai["default"].request(_index["default"]).post('/api/v1/bookings').set('x-access-token', user1.token).send();

            case 2:
              res = _context5.sent;
              assert.equal(res.status, 400, '400 status code is expected');
              assert.equal(res.body.status, 'error');

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('Should return an error if no token is provided',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _chai["default"].request(_index["default"]).post('/api/v1/bookings').send();

            case 2:
              res = _context6.sent;
              assert.equal(res.status, 401, '401 status code is expected');
              assert.equal(res.body.status, 'error');

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('Should return an error if the choosen seat is not available',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var newTrip, res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _bookings["default"].createBooking({
                trip_id: trip.trip_id,
                seat_number: 4
              }, user1.user_id);

            case 2:
              newTrip = {
                trip_id: trip.trip_id,
                seat_number: 4
              };
              _context7.next = 5;
              return _chai["default"].request(_index["default"]).post('/api/v1/bookings').set('x-access-token', user1.token).send(newTrip);

            case 5:
              res = _context7.sent;
              assert.equal(res.status, 422, '422 status code is expected');
              assert.equal(res.body.status, 'error');

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('Get A Booking', function () {
    it('Should get the booking with the given booking id',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
      var booking, newBooking, res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              booking = {
                trip_id: trip.trip_id,
                seat_number: 4
              };
              _context8.next = 3;
              return _bookings["default"].createBooking(booking, user1.user_id);

            case 3:
              newBooking = _context8.sent;
              _context8.next = 6;
              return _chai["default"].request(_index["default"]).get("/api/v1/bookings/".concat(newBooking.booking_id)).set('x-access-token', user1.token);

            case 6:
              res = _context8.sent;
              assert.equal(res.status, 200);
              assert.equal(res.body.data.user_id, user1.user_id);
              assert.equal(res.body.status, 'success');
              assert.isObject(res.body.data);
              assert.hasAnyKeys(res.body.data, ['booking_id', 'user_id', 'trip_id', 'trip_date', 'bus_id', 'first_name', 'last_name', 'email', 'seat_number']);

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('Should return an error for invalid booking id',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _chai["default"].request(_index["default"]).get('/api/v1/bookings/k').set('x-access-token', user1.token);

            case 2:
              res = _context9.sent;
              assert.equal(res.status, 400);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('Should return an error if no token is provided',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10() {
      var booking, newBooking, res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              booking = {
                trip_id: trip.trip_id,
                seat_number: 4
              };
              _context10.next = 3;
              return _bookings["default"].createBooking(booking, user1.user_id);

            case 3:
              newBooking = _context10.sent;
              _context10.next = 6;
              return _chai["default"].request(_index["default"]).get("/api/v1/bookings/".concat(newBooking.booking_id));

            case 6:
              res = _context10.sent;
              assert.equal(res.status, 401);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('Should return an error if user does not own the booking',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee11() {
      var booking, newBooking, res;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              booking = {
                trip_id: trip.trip_id,
                seat_number: 4
              };
              _context11.next = 3;
              return _bookings["default"].createBooking(booking, user1.user_id);

            case 3:
              newBooking = _context11.sent;
              _context11.next = 6;
              return _chai["default"].request(_index["default"]).get("/api/v1/bookings/".concat(newBooking.booking_id)).set('x-access-token', user2.token);

            case 6:
              res = _context11.sent;
              assert.equal(res.status, 403);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('Should return an error for non existent booking',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12() {
      var res;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _bookings["default"].createBooking({
                trip_id: trip.trip_id,
                seat_number: 9
              }, user1.user_id);

            case 2:
              _context12.next = 4;
              return _chai["default"].request(_index["default"]).get('/api/v1/bookings/90000').set('x-access-token', user1.token);

            case 4:
              res = _context12.sent;
              assert.equal(res.status, 404);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 8:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('Get All Bookings', function () {
    it('Admin can get all booking in the database',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13() {
      var res;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _bookings["default"].createBooking({
                trip_id: trip.trip_id,
                seat_number: 9
              }, user1.user_id);

            case 2:
              _context13.next = 4;
              return _bookings["default"].createBooking({
                trip_id: trip.trip_id,
                seat_number: 6
              }, user2.user_id);

            case 4:
              _context13.next = 6;
              return _chai["default"].request(_index["default"]).get('/api/v1/bookings').set('x-access-token', admin.token);

            case 6:
              res = _context13.sent;
              assert.equal(res.status, 200);
              assert.equal(res.body.status, 'success');
              assert.isArray(res.body.data);
              assert.isNotEmpty(res.body.data);

            case 11:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it('User can only see bookings belonging to him/her',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee14() {
      var res;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _bookings["default"].createBooking({
                trip_id: trip.trip_id,
                seat_number: 9
              }, user1.user_id);

            case 2:
              _context14.next = 4;
              return _chai["default"].request(_index["default"]).get('/api/v1/bookings').set('x-access-token', admin.token);

            case 4:
              res = _context14.sent;
              assert.equal(res.status, 200);
              assert.equal(res.body.status, 'success');
              assert.isArray(res.body.data);
              res.body.data.forEach(function (booking) {
                assert.equal(booking.user_id, user1.user_id);
              });

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('Should return an error if no token is provided',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15() {
      var res;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return _bookings["default"].createBooking({
                trip_id: trip.trip_id,
                seat_number: 9
              }, user1.user_id);

            case 2:
              _context15.next = 4;
              return _chai["default"].request(_index["default"]).get('/api/v1/bookings');

            case 4:
              res = _context15.sent;
              assert.equal(res.status, 401);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 8:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it('Should return an error for invalid',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee16() {
      var res;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _bookings["default"].createBooking({
                trip_id: trip.trip_id,
                seat_number: 9
              }, user1.user_id);

            case 2:
              _context16.next = 4;
              return _chai["default"].request(_index["default"]).get('/api/v1/bookings').set('x-access-token', 'ghh76h');

            case 4:
              res = _context16.sent;
              assert.equal(res.status, 400);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 8:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
  });
  describe('Delete Booking', function () {
    it('User should be able to delete his/her booking',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee17() {
      var bookingObj, booking, res;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              bookingObj = {
                trip_id: trip.trip_id,
                seat_number: 9
              };
              _context17.next = 3;
              return _bookings["default"].createBooking(bookingObj, user1.user_id);

            case 3:
              booking = _context17.sent;
              _context17.next = 6;
              return _chai["default"].request(_index["default"])["delete"]("/api/v1/bookings/".concat(booking.booking_id)).set('x-access-token', user1.token);

            case 6:
              res = _context17.sent;
              assert.equal(res.status, 204);
              assert.isUndefined(res.body.data);

            case 9:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it('Should return an error if no token is provided',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee18() {
      var bookingObj, booking, res;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              bookingObj = {
                trip_id: trip.trip_id,
                seat_number: 9
              };
              _context18.next = 3;
              return _bookings["default"].createBooking(bookingObj, user1.user_id);

            case 3:
              booking = _context18.sent;
              _context18.next = 6;
              return _chai["default"].request(_index["default"])["delete"]("/api/v1/bookings/".concat(booking.booking_id));

            case 6:
              res = _context18.sent;
              assert.equal(res.status, 401);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 10:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it('Should return an error if the booking doesnt belong to the user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee19() {
      var bookingObj, booking, res;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              bookingObj = {
                trip_id: trip.trip_id,
                seat_number: 9
              };
              _context19.next = 3;
              return _bookings["default"].createBooking(bookingObj, user1.user_id);

            case 3:
              booking = _context19.sent;
              _context19.next = 6;
              return _chai["default"].request(_index["default"])["delete"]("/api/v1/bookings/".concat(booking.booking_id)).set('x-access-token', user2.token);

            case 6:
              res = _context19.sent;
              assert.equal(res.status, 403);
              assert.equal(res.body.status, 'error');
              assert.hasAllKeys(res.body, ['status', 'message']);

            case 10:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
  });
});