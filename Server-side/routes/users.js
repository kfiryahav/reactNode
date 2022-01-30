var express = require("express");
var router = express.Router();
var { auth_token } = require("../middlewares/auth");

const user_controller = require('../controllers/users.controller');

/* GET all users */
router.get('/', user_controller.get_all_users);

/* GET all user's favorite cards*/
router.get('/fav_cards', auth_token, user_controller.favorite_cards);

/* GET all user's cards creation*/
router.get('/user_cards', auth_token, user_controller.user_cards);

/* POST new user */
router.post('/signup', user_controller.add_user);

/* find user by parameters */
router.get('/user_info', auth_token, user_controller.user_info);

/* check user's token */
router.get('/authantication', auth_token, user_controller.authantication);

//  DELETE user
router.delete('/:userDel', auth_token, user_controller.delete_user);

// PATCH  add favorite card
router.patch('/cards', auth_token, user_controller.add_favorite_card);

//login user
router.post('/login', user_controller.user_login);


module.exports = router;
