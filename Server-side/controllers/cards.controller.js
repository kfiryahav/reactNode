const { cards_schema } = require('../models/cards_model');
const { valid_card, get_bussines_number } = require('../services/helpers');

// get all the cards from the db
const get_all_cards = async (req, res) => {
    try {
        let data = await cards_schema.find({})
        res.json(data);
    } catch (error) {
        res.status(401).json(error)
    }
}

// add a new card to the db but furst checks joi validation
const add_new_card = async (req, res) => {
    let validate_card = valid_card(req.body);
    if (validate_card.error) {
        return res.status(400).json(validate_card.details);
    }
    try {
        let card = new cards_schema(req.body);
        card.user_id = req.token_data._id;
        card.bussines_number = await get_bussines_number(cards_schema);
        await card.save();
        return res.json(card);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

// delete card by ID
const delete_card = async (req, res) => {
    let cardId = req.params.id_del;
    try {
        let data = await cards_schema.deleteOne({ _id: cardId });
        res.json(data);
    } catch (error) {
        res.status(401).json(error);
    }
}

// edit card by ID
const edit_card = async (req, res) => {
    let card_id = req.params.id_edit;
    try {
        let data = await cards_schema.updateOne({ _id: card_id }, req.body);
        res.json(data);
    } catch (error) {
        res.status(401).json(error);
    }
}

// get all the user card that created by him
const get_user_card = async (req, res) => {
    let user_id = req.params.id;
    try {
        let data = await cards_schema.find({ user_id: user_id });
        res.json(data);
    } catch (error) {
        res.status(401).json(error);
    }
}

// get single card by ID
const single_card = async (req, res) => {
    let card_id = req.params.single_card;
    try {
        let data = await cards_schema.findById({ _id: card_id });
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = {
    get_all_cards,
    add_new_card,
    delete_card,
    edit_card,
    single_card,
    get_user_card
}