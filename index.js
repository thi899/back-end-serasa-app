const express = require('express');
const server = express();
var cors = require('cors')

server.use(cors())

server.use(express.json());

class user {
    constructor(id, cpf_cnpj, nome_produtor, nome_fazenda, cidade, 
        estado, area_total_hectares_fazenda, area_agricultavel_hectares, 
        area_vegetacao_hectares, culturas_plantadas
    ) {
        this.id = id,
        this.cpf_cnpj = cpf_cnpj,
        this.nome_produtor = nome_produtor,
        this.nome_fazenda = nome_fazenda,
        this.cidade = cidade,
        this.estado = estado,
        this.area_total_hectares_fazenda = area_total_hectares_fazenda,
        this.area_agricultavel_hectares = area_agricultavel_hectares,
        this.area_vegetacao_hectares = area_vegetacao_hectares,
        this.culturas_plantadas = culturas_plantadas
    }
}



const users = [user];

server.get('/users/:id', (req, res) => {

    const { id } = req.params;
    console.log(id);

    const specificUserId = users.find((user) => user.id == id);

    return res.json(specificUserId);
});
server.put('/users/:id', (req, res) => {
    const { id } = req.params;

    const index = users.findIndex((user) => user.id == id);

    req.body.id = Number(id);

    users[index] = req.body;


    return res.json(users);
});
server.get('/users', (req, res) => {
    return res.json(users);
});

server.post('/users', (req, res) => {
    const body = req.body;

    body.id = users[users.length -1]?.id + 1 || 0 + 1;

    users.push(body);

    return res.json(users);
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const index = users.findIndex((user) => user.id === id);

    users.splice(index, 1);

    return res.json({ message: 'Usuario deletado.'});
});





server.listen(5000);


