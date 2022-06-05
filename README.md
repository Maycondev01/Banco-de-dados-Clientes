# Instalando o Sequelize
    npm init -y
    npm install sequelize pg pg-hstore express
    npm install -g sequelize-cli
    npm install sequelize-cli -D
    npx sequelize-cli init

# Configurar Config JSON para Config.JS e Preencher
    module.exports = {
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "123",
    database: "curso_sequelize",
    define: {
        timestamps: true,
    },
    };

# Criar Banco de Dados
    npx sequelize db:create

# Criar Migration (NOME DA CREATE TABLE)
    npx sequelize migration:create --name=planets

# Criar Tabela No Sequelize / Javascript
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("planets", {
      id: {
        type: Sequelize.INTEGER, // Tipo Inteiro
        autoIncrement: true,   // Auto incrimento?
        allowNull: false, // Permitir Nullo?
        primaryKey: true, // Chave Primaria
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: { // Quando o Dado foi Criado
        type: Sequelize.DATE,
      },
      updatedAt: { // Quando o Dado foi Alterado
        type: Sequelize.DATE,
      },

    });
    },
# Deletar Tabela No Sequelize / Javascript
    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("planets");
    }
# Rodar a Migration Up
    npx sequelize db:migrate

# Roda a Migration Down
    npx sequelize db:migrate:undo

# Estrutura Do Banco De Dados / Criar Banco de Dados
## Config/Sequelize.js:
    const Sequelize = require('sequelize'); // Exportar o Sequelize
    const database = require('./config') // Receber as informações do Banco de dados

    const sequelize = new Sequelize(database);

    module.exports = sequelize  // Chamar o Arquivo de Configuração para Manipular o Banco de Dados


# Criar Um Arquivo Dentro De Models Para Fazer A Comunicação Com Banco De dados. Ex: Planet.js
## Models/Planet.js:
    const { DataTypes } = require("sequelize"); 
    const sequelize = require("../config/sequelize");

    const Planet = sequelize.define("planets", {
    name: DataTypes.STRING,
    position: DataTypes.INTEGER,

    }); 
    module.exports = Planet;

# Criar um arquivo na Raiz da Pasta para Inserir na Estrutura de comunicação
## src/index.js

## src/index.js: | Criar
## Inserir Dados No Index para Teste 

    (async () => {
    const Planet = require("./models/Planet");

    const newPlanet = await Planet.create({
        name: "Terra",
        position: 3,
    });
    console.log(newPlanet);

    })();

# Para Testar O Projeto Rodar o Node No Terminal
    npx nodemon src/index

# Fazer Consulta De Todos Os Dados Via Sequelize / Javascript
## src/index.js: | Consultar

    (async () => {
    const Planet = require("./models/Planet");

    const seePlanets = await Planet.findAll();

    console.log(seePlanets);

    })();

# Fazer Consulta Por ID Via Sequelize / Javascript
## src/index.js: | Pesquisar Por Id

    (async () => {
    const Planet = require("./models/Planet");

    const seePlanets = await Planet.findByPk(4);

    console.log(seePlanets);

    })();

# Fazer Consulta De Dados Por Nome
## src/index.js: | Pesquisar por Nome

    (async () => {
    const Planet = require("./models/Planet");

    const seePlanets = await Planet.findAll({
        where: {
            name: "Terra",
        },
    });

    console.log(seePlanets);

    })();

# Atualizar Dados Via Sequelize
## src/index.js: | Atualizar o Dado
    (async () => {
    const Planet = require("./models/Planet");
    
    const updatePlanets = await Planet.findByPk(2);
    updatePlanets.name = "Marte";
    await updatePlanets.save();

    console.log(updatePlanets);

    })();

# Removendo Dados Via Sequelize
## src/index: js 
    (async () => {
    const Planet = require("./models/Planet");

    const deletePlanets = await Planet.findByPk(4);

    console.log(deletePlanets);

    await deletePlanets.destroy();

    })();

# TRANSFORMANDO EM API
#
#


# CRIAR PASTAR CONTROLLER E ARQUIVO <- COMUNICAÇÃO MVC - MODEL - VIEW - CONTROLLER>
## PlanetController.js:
    const Planet = require("../models/Planet");

    module.exports = {
    async store(req, res) {
        const { name, position } = req.body; // PEGANDO NAME,POSITION DA PASTA MODELS/PLANET

        const planet = await Planet.create({ name, position }); // Criar 
        return res.json(planet)
    },

    async index(req, res) { // Pesquisar
        const planets = await Planet.findAll();
        return res.json(planets);
    },

    async put(req, res) {
        const { name, size, position } = req.body; // vou utilizar o name,size e position que vou querer pegar
        await Planet.update( // Atualizar 
            { name, size, position }, // Atualizar Name,Size e Position de um Id
            {
                where: { // Quando
                    id: req.params.id,
                },
            },
        );
        return res.send("Planeta Atualizado Com Sucesso!!!");
    },
    async delete(req, res) {
        await Planet.destroy({ // Delete
            where: {
                id: req.params.id,
            },
        });
        res.send("Planeta Deletado!!!")
    },

    };


# CRIAR PASTA SRC E COLOCAR ARQUIVOS
## src/index.js:
    const express = require("express");
    const routes = require("./routes"); // Importar Arquivo routes

    require("../config/associations") // Requerer associação entre Planet e Satelite

    const app = express();

    app.use(express.json()); // usar método json do express
    app.use(routes); // Usar routes

    app.listen(3000);

## routes.js:
    const express = require('express'); // Importar o Express
    const routes = express.Router(); // importar do express o método Router


    const PlanetController = require("../Controller/PlanetController"); // Importar PlanetController
    const SateliteController = require("../Controller/SateliteController"); // Importar SaliteController
 
    routes.post("/planets", PlanetController.store); // Método store do PlanetController
    routes.get("/planets", PlanetController.index) // Método index do PlanetController
    routes.put("/planets/:id", PlanetController.put); // Método Put do PlanetController
    routes.delete("/planets/:id", PlanetController.delete); // Método Delete do PlanetController

    routes.post("/planet/:planetId/satelites", SateliteController.store); 
    routes.get("/planet/:planetId/satelites", SateliteController.index); 


    module.exports = routes

# INSTALAR O NODEMON
    npm install nodemon --save-dev

# Iniciar Nodemon (Pode escolher qual pasta/arquivo iniciar)
    npx nodemon src/index

# Criar Nova Migration
    npx sequelize migration:create --name=satelites


# Migration Satelites
## satelites.js
    'use strict';

    module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("satelites", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serial_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      planetId: {
        type: Sequelize.INTEGER,
        references: { model: "planets", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    },

    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("satelites");
    },
    };

# Rodar Nova Migration
    npx sequelize db:migrate

# Criar Na Pasta Models Novo Arquivo Para Migration Satelites
## Satelite.js:
    const { DataTypes } = require("sequelize");
    const sequelize = require("../config/sequelize");

    const Satelite = sequelize.define("satelites", {
    name: DataTypes.STRING,
    serial_number: DataTypes.INTEGER,
    planetId: DataTypes.INTEGER, 
    });

module.exports = Satelite;

# CRIAR DENTRO DE CONFIG UM ARQUIVO PARA ASSOCIAR PLANET E SATELITE
## associations.js:
    const Planet = require("../models/Planet");
    const Satelite = require("../models/Satelite");

    Planet.hasOne(Satelite, {onDelete: "CASCADE", onUpdate: "CASCADE"}); // Planet tem um Satelite
    Satelite.belongsTo(Planet, {foreingKey: "planetId", as: "planet"}); // Satelite Pertence a Planet

    module.exports = {Planet, Satelite};

# CRIAR EM CONTROLLER ARQUIVO SATELITE
## SateliteController.js:
    const Satelite = require("../models/Satelite");
    const Planet = require("../models/Planet");

    module.exports = {
    async store(req, res) {
        const { planetId } = req.params; // Referencia chave estrangeira
        const { name, serial_number } = req.body; // 

        const planet = await Planet.findByPk(planetId);

        if (!planet) {
            res.send("Esse planeta não existe!");

        }
        const satelite = await Satelite.create({name, serial_number, planetId});
        return res.json(satelite)
    },
    async index(req, res) {
        const { planetId } = await req.params;

        if (!planetId) {
            res.send("Esse planeta não existe!");
        }
        const planet = await Planet.findByPk(planetId, {
            include: Satelite,
        });

        return res.json(planet);
    }
    }


# Associação Many To Many

# Criar novas Migration
    npx sequelize migration:create --name=caps
    npx sequelize migration:create --name=spaceship
    npx sequelize migration:create --name=capSpaceships


# Migration Caps
## caps.js:
    'use strict';

    module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("caps", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registerNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    },

    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("caps");
    }
    };

# Migration Spaceship
## spaceship.js:
    'use strict';

    module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("spaceships", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    },

    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("spaceships");
    }
    };

# Migration capSpaceships
## capSpaceships.js:
    'use strict';

    module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("capSpaceship", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      capId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "caps", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      spaceshipId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "spaceships", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    },

    down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable("capSpaceship");
    },
    };

# Criar Models
## Cap.js:
  const { DataTypes } = require("sequelize"); 
  const sequelize = require("../config/sequelize"); // Arquivo Sequelize Da Config

  const Cap = sequelize.define("caps", { // Caps = nome da tabela
    name: DataTypes.STRING, // dados que manipulo dentro da tabela
    registerNumber: DataTypes.STRING,
  });

  module.exports = Cap;


## Spaceship.js:
  const { DataTypes } = require("sequelize"); 
  const sequelize = require("../config/sequelize");

  const Spaceship = sequelize.define("spaceships", { // migration spaceship
      name: DataTypes.STRING, // dados da migration
      capacity: DataTypes.INTEGER,
  });

  module.exports = Spaceship;

# CRIAR NOVA ASSOCIAÇÃO NA PASTA CONFIG
## associations.js:
  const Cap = require("../models/Cap");
  const Planet = require("../models/Planet");
  const Satelite = require("../models/Satelite");
  const Spaceship = require("../models/Spaceship");

  /*
  Planet.hasOne(Satelite, { onDelete: "CASCADE", onUpdate: "CASCADE" }); // Planet tem um Satelite
  Satelite.belongsTo(Planet, { foreingKey: "planetId", as: "planet" }); // Satelite Pertence a Planet
  */

  Planet.hasMany(Satelite, { onDelete: "CASCADE", onUpdate: "CASCADE" }); // Planet tem muitos
  Satelite.belongsTo(Planet, { foreingKey: "planetId", as: "planet" }); // Satelite Pertence a Planet

  Cap.belongsToMany(Spaceship, { // Capitão.BelongsToMany = Capitão Pertence A Muitas Naves 
      foreingKey: "capId", // ForeingKey que estão relacionados
      through: "capSpaceship",  // Tabela de ligação com a foreingKey
      as: "spaceships",
  });

  Spaceship.belongsToMany(Cap, { // Naves Pertence a muitos Capitões
      foreingKey: "spaceShipId", // ForeingKey que estão relacionados
      through: "capSpaceship",  // Tabela de ligação com a foreingKey
      as: "caps",
  });


  module.exports = { Planet, Satelite };


# CRIAR NOVO ARQUIVO JS NO CONTROLLER
## Controller/CapController.js:
  const Cap = require('../models/Cap');

  module.exports = {
      async store(req, res) {
          const { name, registeNumber } = req.body;
          const cap = await Cap.create({ name, registerNumber });

          return res.json(cap)
      },
      async index(req, res) {
          const cap = await Cap.findAll();

          return res.json(cap);
      },
  };

## Controller/SpaceshipController.js:
  const Spaceship = require('../models/Spaceship');
  const Cap = require('../models/Cap');

  module.exports = {
      async store(req, res) {
          const { capId } = req.params;
          const { name, capacity } = req.body;
          const cap = await Cap.findByPk(capId); // Encontrar Por Primary Key

          if (!cap) { // Se não existe capitão então:
              res.send("Error, este capitão não existe!");
          }

          const [spaceships] = await Spaceship.findOrCreate({ // Se não existir, criar um
              where: { name, capacity }, // Onde Name e Capacidade
          });
          await cap.addSpaceship(spaceships); // Se tudo der certo, Então Adiconar Espaçonave
      },
      async index(req, res) {
          const { capId } = req.params; // Pegar Id Do Cap

          const cap = await Cap.findByPk(capId, { // Buscar Por Id
              include: { association: "spaceships" } // Incluir Associação Spaceships
          });

          return res.json(cap);
      },
  };

# COLOCAR OS CONTROLLERS EM ROUTES.JS
## SRC/routes.js:
  const express = require('express'); // Importar o Express
  const routes = express.Router(); // importar do express o método Router


  const PlanetController = require("../Controller/PlanetController"); // Importar PlanetController
  const SateliteController = require("../Controller/SateliteController"); // Importar SaliteController
  const CapController = require("../Controller/CapController") // Importar Dados Do CapController
  const SpaceshipController = require("../Controller/SpaceshipController")

  routes.post("/planets", PlanetController.store); // Método store do PlanetController
  routes.get("/planets", PlanetController.index) // Método index do PlanetController
  routes.put("/planets/:id", PlanetController.put); // Método Put do PlanetController
  routes.delete("/planets/:id", PlanetController.delete); // Método Delete do PlanetController

  routes.post("/planet/:planetId/satelites", SateliteController.store);
  routes.get("/planet/:planetId/satelites", SateliteController.index);

  routes.post("/cap", CapController.store);
  routes.get("/cap", CapController.index);

  routes.post("/caps/:capId/spaceships", SpaceshipController.store);
  routes.get("/caps/:capId/spaceships", SpaceshipController.index);

  module.exports = routes

