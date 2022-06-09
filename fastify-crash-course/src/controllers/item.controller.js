import itemModel from '../models/item.model.js';

const store = async (req, reply) => {
    const { name, description, price, quantity } = req.body;

    const p1 = new itemModel({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
    });

    p1.save()
        .then(result => {
           
            reply.code(201).send({data: result});
        })
        .catch(err => {
            console.log(err);
            reply.code(500);
        });
};

const findOne = async (req, reply) => {
    const item = await itemModel.findById(req.query._id).exec();

    if (item === null) reply.code(404);

    reply.code(200).send(item);
};

const findAll = async (req, reply) => {
    let docs = [];
    (await itemModel.find().sort('updatedAt')).forEach(doc => {
        docs.push(doc);
    });

    if (docs.length === 0) {
        reply.code(404);
    }
    reply.code(200).send(docs);
};

export default { store, findOne, findAll };
