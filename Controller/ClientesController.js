const Clientes = require("../models/Clientes");

module.exports = {
    async store(req, res) {
        const { name, cidade, idade, cartao } = req.body;

        const clientes = await Clientes.create({ name, cidade, idade, cartao });
        return res.json(clientes);
    },

    async index(req, res) {
        const clientes = await Clientes.findAll();
        return res.json(clientes);
    },

    async put(req, res) {
        const { name, cidade, idade, cartao } = req.body;
        await Clientes.update(
            { name, cidade, idade, cartao },
            {
                where: {
                    id: req.params.id,
                },
            },
        );
        return res.send("Cliente Adicionado Com Sucesso!!!");
    },
    async delete(req, res) {
        await Clientes.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.send("Cliente Excluido Com Sucesso!");
    },
};