const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { cards_schema } = require('../models/cards_model')

const validUser = (data_body) => {
    let joi_user_schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().required().min(6),
        password: Joi.string().min(6).required(),
        bussiness: Joi.boolean()
    });
    return joi_user_schema.validate(data_body);
}

const valid_card = (data_body) => {
    let joi_schema = Joi.object({
        bussines_name: Joi.string().required(),
        bussines_description: Joi.string(),
        bussines_address: Joi.string().required(),
        bussines_image: Joi.string(),
        bussines_phone: Joi.string().min(9).required(),
    })
    return joi_schema.validate(data_body);
}

const valid_card_array = (data_body) => {
    let joi_schema = Joi.object({
        bussines_name: Joi.string(),
        bussines_address: Joi.string(),
        bussines_phone: Joi.string(),
        cards: Joi.array()
    })
    return joi_schema.validate(data_body);
}

const get_token = (user_id) => {
    let token = jwt.sign({ _id: user_id }, 'secretKey', { expiresIn: '30mins' });
    return token;
}

const get_bussines_number = async (cards_schema) => {
    let random_number = Math.floor(Math.random() * 999999);
    let card = await cards_schema.findOne({ bussines_number: random_number });
    if (!card) {
        return random_number;
    }
}

module.exports = {
    validUser,
    valid_card,
    valid_card_array,
    get_token,
    get_bussines_number
}