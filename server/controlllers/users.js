import {
  verifyPassword,
  generateToken,
} from '../helperFunctions/a';
import helperFunctions from '../helperFunctions/users.helperFunctions';


class User {
  static async create(req, res) {
    try {
      const newUser = await helperFunctions.createUser(req.body);
      return res.header('x-access-token', newUser.token).status(201).json({
        status: 'success',
        data: {
          user_id: newUser.user_id,
          is_admin: newUser.is_admin,
          token: newUser.token,
        },
      });
    } catch (error) {
      return res.status(409).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    const user = await helperFunctions.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }
    try {
      const correctPassword = await verifyPassword(
        req.body.password,
        user.password,
      );
      if (!correctPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid Password',
        });
      }

      const { password, date_registered, ...userObj } = user;
      const payload = {
        userId: user.user_id,
        isAdmin: user.is_admin,
        email: user.email,
      };
      const token = await generateToken(payload);
      return res.header('x-access-token', token).status(200).json({
        status: 'success',
        data: {
          token,
          ...userObj,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

  static async findUser(req, res) {
    try {
      const foundUser = await helperFunctions.getUserById(req.user, req.params.userId);
      if (!foundUser[0]) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }
      const {
        user_id, first_name, last_name, email, is_admin,
      } = foundUser[0];
      return res.status(200).json({
        status: 'success',
        data: {
          user_id,
          first_name,
          last_name,
          email,
          is_admin,
        },
      });
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default User;
