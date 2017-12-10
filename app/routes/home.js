/**
 * Created by Tadashi on 03/11/2017.
 */
//let api = require('../api/api');
let fs = require('fs');
module.exports = function(app){


// ---------------------- INICIO CONSULTAR -----------------
    // ---------------------- INICIO CONSULTAR GERAL -----------------
    app.get('/vendas/consultar', (req, res) => {
        let resultsJson = '';
        let connection = app.infra.connectionFactory();
        let listas = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
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
        });
    // ---------------------- FIM CONSULTAR GERAL -----------------

    // ---------------------- INICIO CONSULTAR VENDA -----------------
    app.get('/vendas/consultar/idVenda/:idVenda', (req, res) => {
        let idVenda= req.params.idVenda;
    console.log('~>idVenda: ', idVenda);
    let resultJson = '';
    let connection = app.infra.connectionFactory();
    let lstEspecifica = new app.infra.applicationDAO(connection);
    lstEspecifica.vendaEspecifica(idVenda, function (err, results) {
        resultsJson = JSON.stringify(results);
        console.log(resultsJson);
        res.send(resultsJson);
    });
    connection.end();
    });
    // ---------------------- FIM CONSULTAR USUARIO -----------------

    // ---------------------- INICIO CONSULTAR PRODUTO -----------------
    app.get('/vendas/consultar/idProduto/:idProduto', (req, res) => {
        let idProduto= req.params.idProduto;
    let resultJson = '';
    let connection = app.infra.connectionFactory();
    let lstEspecifica = new app.infra.applicationDAO(connection);
    lstEspecifica.produtoEspecifico(idProduto, function (err, results) {
        resultsJson = JSON.stringify(results);
        console.log(resultsJson);
        res.send(resultsJson);
    });
    connection.end();
    });
    // ---------------------- FIM CONSULTAR PRODUTO -----------------

    // ---------------------- INICIO CONSULTAR USUARIO -----------------
    app.get('/vendas/consultar/idUsuario/:idUsuario', (req, res) => {
        let idUsuario = req.params.idUsuario;
    let resultJson = '';
    let connection = app.infra.connectionFactory();
    let lstEspecifica = new app.infra.applicationDAO(connection);
    lstEspecifica.usuarioEspecifico(idUsuario, function (err, results) {
        resultsJson = JSON.stringify(results);
        console.log(resultsJson);
        res.send(resultsJson);
    });
    connection.end();
    });
    // ---------------------- FIM CONSULTAR USUARIO -----------------

    // ---------------------- INICIO CONSULTAR DATA -----------------
    app.get('/vendas/consultar/dataVenda/:dataVenda', (req, res) => {
        var dtVenda = req.params.dataVenda;
    console.log(dtVenda);
    let resultJson = '';
    let connection = app.infra.connectionFactory();
    let lstEspecifica = new app.infra.applicationDAO(connection);
    lstEspecifica.dataEspecifica(dtVenda, function (err, results) {
        resultsJson = JSON.stringify(results);
        console.log(resultsJson);
        res.send(resultsJson);
    });
    connection.end();
    });
    // ---------------------- FIM CONSULTAR DATA -----------------
// ---------------------- FIM CONSULTAR -----------------

// ---------------------- INICIO INSERIR -----------------
    app.post('/vendas/incluir',(req, res) => {
        let venda = req.body;
        let resultsJson = '';
        let connection = app.infra.connectionFactory();
        let inserir = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
        inserir.salva(venda, function (err, results) {
            resultsJson = JSON.stringify(results);
            res.status(200).send(resultsJson);
        });
        connection.end();
    });
// ---------------------- FIM INSERIR -----------------

// ---------------------- INICIO ATUALIZAR -----------------
    app.put('/vendas/editar',(req, res) => {
        let params = req.body;
        console.log(params);
        let info = params["info"];
        console.log(info);
        let id = params["id"];
        console.log(id);
        let resultJson = '';
        let connection = app.infra.connectionFactory();
        let atualizar = new app.infra.applicationDAO(connection);
        atualizar.atualiza(info, id, function(err, results){
            console.log(err);
        });
        res.end();
        connection.end();
})
// ---------------------- FIM ATUALIZAR -----------------

// ---------------------- INICIO DELETAR -----------------
    app.delete('/vendas/excluir/', (req,res) => {
        let idVendas = req.body;
        console.log(idVendas);
        let resultJson = '';
        let connection = app.infra.connectionFactory();
        let deletar = new app.infra.applicationDAO(connection);
        deletar.deleta(idVendas, function(err, results){
            console.log('~>results: ', results);
            console.log('~>Err: ', err);
        });
        res.end();
        connection.end();
    });
// ---------------------- FIM DELETAR -----------------












    app.route('/api')
        .get((req, res) => {
            let resultsJson = '';
            let connection = app.infra.connectionFactory();
            let listas = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
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
            let teste = req.body;
            let resultsJson = '';
            let connection = app.infra.connectionFactory();
            let atualizar = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
            atualizar.salva(teste, function (err, results) {
                resultsJson = JSON.stringify(results);
                console.log('~>results: ', results);
                console.log('~>Err: ', err);
                res.send(resultsJson)
            });
            connection.end();
        })
        .delete((req,res) => {
            let teste = req.body;
            let resultJson = '';
            let connection = app.infra.connectionFactory();
            let deletar = new app.infra.applicationDAO(connection);
            deletar.deleta(teste, function(err, results){
               console.log('~>results: ', results);
               console.log('~>Err: ', err);
            });
            res.end();
            connection.end();
        })
        .put((req, res) => {
            let teste = req.body;
            console.log(teste);
            let produto = teste["produto"];
            console.log(produto);
            let id = teste["id"];
            console.log(id);
            let resultJson = '';
            let connection = app.infra.connectionFactory();
            let atualizar = new app.infra.applicationDAO(connection);
            atualizar.atualiza(produto, id, function(err, results){
                console.log(err);
            });
            res.end();
            connection.end();
        })
};