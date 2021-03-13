const express = require('express');
const { findPersonByCPF } = require('../db');
const bittardb = require('../db');
const router = express.Router();

router.get('/imc/all', async (req, res, next) => {
    try {
        let allCalculations = await bittardb.fetchAllCalculations();
        res.json(allCalculations);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/imc', async (req, res, next) => {
    try {
        //calculate imc
        let imc = calculateIMC(req.body);
        let category = categoryIMC(imc);

        // save imc to the database
        saveIMC(req.body, imc);

        //return imc with category to the browser
        res.json(imc + ", " + category);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/imc/search/:cpf', async (req, res, next) => {
    try {
        let person = await bittardb.findPersonByCPF(req.params.cpf);
        let result = await bittardb.findCalculationsByIdPerson(person?.id_person);

        if (result === undefined) { res.sendStatus(404); }
        res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

function calculateIMC(person) {
    return (person.weight / Math.pow(person.height / 100, 2));
}

function categoryIMC(imc) {
    if (imc < 17) {
        return "muito abaixo do peso";
    } else if (imc > 17 && imc < 18.49) {
        return "abaixo do peso ideal";
    } else if (imc > 18.5 && imc < 24.99) {
        return "peso considerado normal";
    } else if (imc > 24 && imc < 29.99) {
        return "acima do peso";
    } else if (imc > 30 && imc < 34.99) {
        return "obesidade grau I";
    } else if (imc > 35 && imc < 39.99) {
        return "obesidade grau II (severa)";
    } else if (imc > 40) {
        return "obesidade grau III (conhecida como obesidade mórbida)";
    }
}

async function saveIMC(person, imc) {
    let savedPerson = await bittardb.findPersonByCPF(person.cpf);

    if (savedPerson) {
        let id_person = savedPerson.id_person;
        let id_calculation = await bittardb.newCalculation(person, imc);

        await bittardb.linkPersonToCalculation(id_person, id_calculation);
    } else {
        let id_person = await bittardb.newPerson(person);
        let id_calculation = await bittardb.newCalculation(person, imc);

        id_person = id_person;
        id_calculation = id_calculation;

        await bittardb.linkPersonToCalculation(id_person, id_calculation);
    }

}

module.exports = router;