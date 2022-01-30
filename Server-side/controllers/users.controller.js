const { user_model } = require('../models/user_model');
const { cards_schema } = require('../models/cards_model');
const { validUser, get_token, valid_card_array } = require('../services/helpers');
const bcrypt = require("bcrypt");

/* GET all users */
const get_all_users = async (req, res, next) => {
    try {
        let data = await user_model.find({});
        res.json(data);
    } catch (error) {
        res.status(404).json(error);
    }
}

/* GET user by parameters */
const user_info = async (req, res, next) => {
    try {
        let data = await user_model.findOne({ _id: req.token_data._id }, { password: 0 });
        res.json(data);
    } catch (error) {
        res.status(404).json(error);
    }
}

/* GET all user's cards creation*/
const user_cards = async (req, res, next) => {
    try {
        let user = await user_model.findOne({ _id: req.token_data._id }, { password: 0 });
        let user_id_cards = user._id;
        let user_cards = await cards_schema.find({ user_id: user_id_cards });
        res.json(user_cards);
    } catch (error) {
        res.status(404).json(error);
    }
}

/* update user's favorite_cards */
const favorite_cards = async (req, res, next) => {
    try {
        let user = await user_model.findOne({ _id: req.token_data._id });
        let cards_ar = user.cards;
        let user_cards = await cards_schema.find({ bussines_number: { $in: cards_ar } });
        res.json(user_cards);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

/* POST new user */
const add_user = async (req, res, next) => {
    let user = new user_model(req.body);
    let valid_body_data = validUser(req.body);

    if (valid_body_data.error) {
        return res.status(400).json(valid_body_data.error.details);
    }

    user.password = await bcrypt.hash(user.password, 10);

    try {
        await user.save();
        res.json(user);

    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({ err: "User or Email already exists", code: 11000 })
        }
        console.log(error)
        res.status(404);
    }
}

//  DELETE user
const delete_user = async (req, res, next) => {
    let userId = req.params.userDel;
    try {
        let data = await user_model.deleteOne({ _id: userId });
        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

// user login
const user_login = async (req, res, next) => {
    try {
        let user = await user_model.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json('User or password inccorect');
        }
        let valid_password = await bcrypt.compare(req.body.password, user.password);
        if (!valid_password) {
            return res.status(401).json('User or Password are incorrect');
        }
        let new_token = get_token(user._id);
        res.json({ token: new_token });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

// add new card to favorite
const add_favorite_card = async (req, res) => {
    try {
        let data = await user_model.updateOne({ _id: req.token_data._id }, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

// check authantication
const authantication = async (req, res, next) => {
    res.json({ message: 'OK' });
}

module.exports = {
    get_all_users,
    user_info,
    add_user,
    delete_user,
    user_login,
    user_cards,
    favorite_cards,
    add_favorite_card,
    authantication
}