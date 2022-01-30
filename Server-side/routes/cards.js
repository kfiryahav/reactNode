var express = require('express');
var router = express.Router();
var { auth_token, check_if_bussiness } = require('../middlewares/auth');

var cards_controller = require('../controllers/cards.controller');

/* GET cards. */
router.get('/', cards_controller.get_all_cards);

/* POST card. */
router.post('/', auth_token, check_if_bussiness, cards_controller.add_new_card);

/* GET card. */
router.get('/:id', auth_token, check_if_bussiness, cards_controller.get_user_card);

/* DELETE card. */
router.delete('/:id_del', auth_token, check_if_bussiness, cards_controller.delete_card);

/* PUT card. */
router.put('/:id_edit', auth_token, check_if_bussiness, cards_controller.edit_card);

/* GET card. */
router.get('/single/:single_card', auth_token, check_if_bussiness, cards_controller.single_card);

module.exports = router;