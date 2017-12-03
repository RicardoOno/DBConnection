/**
 * Created by Tadashi on 03/11/2017.
 */
//var api = require('../api/api');
let fs = require('fs');
module.exports = function(app){

    app.route('/api')
        .get((req, res) => {
            var resultsJson = '';
            var connection = app.infra.connectionFactory();
            var listas = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
            listas.lista(function (error, results, fields) {
                resultsJson = JSON.stringify(results);
                console.log(resultsJson);
                fs.writeFile('bd.json', resultsJson, (err) => {
                    if(err) throw err;
                    console.log('Salvo');
                });
                res.send(resultsJson);
            });
            connection.end();
        })
        .post((req, res) => {
            var teste = req.body;
            var resultsJson = '';
            var connection = app.infra.connectionFactory();
            var atualizar = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
            atualizar.salva(teste, function (err, results) {
                resultsJson = JSON.stringify(results);
                console.log('~>results: ', results);
                console.log('~>Err: ', err);
                res.send(resultsJson)
            });
            connection.end();
        })
        .delete((req,res) => {
            var teste = req.body;
            var resultJson = '';
            var connection = app.infra.connectionFactory();
            var deletar = new app.infra.applicationDAO(connection);
            deletar.deleta(teste, function(err, results){
               console.log('~>results: ', results);
               console.log('~>Err: ', err);
            });
            res.end();
            connection.end();
        })
        .put((req, res) => {
            var teste = req.body;
            console.log(teste);
            var produto = teste["produto"];
            console.log(produto);
            var id = teste["id"];
            console.log(id);
            var resultJson = '';
            var connection = app.infra.connectionFactory();
            var atualizar = new app.infra.applicationDAO(connection);
            atualizar.atualiza(produto, id, function(err, results){
                console.log(err);
            });
            res.end();
            connection.end();
        })
};