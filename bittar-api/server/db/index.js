const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "12345678",
    database: "bittar",
    host: "localhost",
    port: 5432,
})

let bittardb = {};

bittardb.fetchAllCalculations = () => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT p.cpf, p.name, c.height, c.weight, c.imc, c.created_at
        FROM person_calculation pc
        JOIN person p
            ON pc.id_person = p.id_person
        JOIN calculation c
            ON pc.id_calculation = c.id_calculation
        `, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        })
    });
};

bittardb.findCalculationsByIdPerson = (id_person) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT p.cpf, p.id_person, p.name, c.height, c.weight, c.imc, c.created_at
        FROM person_calculation pc
        JOIN person p
            ON pc.id_person = p.id_person
        JOIN calculation c
            ON pc.id_calculation = c.id_calculation
        WHERE
            pc.id_person = ($1)
        `, [id_person], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows);
        })
    });
};

bittardb.newPerson = (person) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO person(cpf, name) VALUES ($1, $2) RETURNING id_person`, [person.cpf, person.name], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows[0].id_person);
        })
    });
};

bittardb.findPersonByCPF = (cpf) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM person WHERE cpf = $1`, [cpf], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows[0]);
        })
    });
};

bittardb.newCalculation = (person, imc) => {
    let created_at = new Date();

    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO calculation(height, weight, imc, created_at) VALUES ($1, $2, $3, $4) RETURNING id_calculation`, [person.height, person.weight, imc, created_at], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows[0].id_calculation);
        })
    });
};

bittardb.linkPersonToCalculation = (id_person, id_calculation) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO person_calculation(id_person, id_calculation) VALUES ($1, $2) RETURNING id_calculation`, [id_person, id_calculation], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results.rows[0].id_calculation);
        })
    });
};


module.exports = bittardb;