/**
 * Created by Tadashi on 03/11/2017.
 */
//let api = require('../api/api');
let fs = require('fs');
module.exports = function(app){
let errorMsg = require('./errorMsg.json');

// ---------------------- INICIO CONSULTAR -----------------
    // ---------------------- INICIO CONSULTAR GERAL -----------------
    app.get('/vendas/consultar', (req, res) => {
        let resultsJson = '';
        let connection = app.infra.connectionFactory();
        let listas = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
        listas.lista(function (error, results, fields) {
            fs.writeFile('bd.json', resultsJson, (err) => {
                if(err) throw err;
            console.log('Salvo');
        });
            if(results.length === 0){
                res.send(errorMsg["consultar"][0]);
            } else {
                res.send(results);
            }
        });
        connection.end();
        });
    // ---------------------- FIM CONSULTAR GERAL -----------------

    // ---------------------- INICIO CONSULTAR VENDA -----------------
    app.get('/vendas/consultar/idVenda/:idVenda', (req, res) => {
        let idVenda= req.params.idVenda;
    if(isNaN(idVenda)){
        res.send(errorMsg["consultar"][5]);
    } else {
        console.log('~>idVenda: ', idVenda);
        let resultJson = '';
        let connection = app.infra.connectionFactory();
        let lstEspecifica = new app.infra.applicationDAO(connection);
        lstEspecifica.vendaEspecifica(idVenda, function (err, results) {
            console.log(results.length);
            if (results.length === 0) {
                res.send(errorMsg["consultar"][1]);
            } else {
                res.send(results);
            }
        });
        connection.end();
    }
    });
    // ---------------------- FIM CONSULTAR USUARIO -----------------

    // ---------------------- INICIO CONSULTAR PRODUTO -----------------
    app.get('/vendas/consultar/idProduto/:idProduto', (req, res) => {
        let idProduto= req.params.idProduto;
    if(isNaN(idProduto)){
        res.send(errorMsg["consultar"][5]);
    } else {
        let resultJson = '';
        let connection = app.infra.connectionFactory();
        let lstEspecifica = new app.infra.applicationDAO(connection);
        lstEspecifica.produtoEspecifico(idProduto, function (err, results) {
            console.log(results.length);
            if (results.length === 0) {
                res.send(errorMsg["consultar"][2]);
            } else {
                res.send(results);
            }
        });
        connection.end();
    }
    });
    // ---------------------- FIM CONSULTAR PRODUTO -----------------

    // ---------------------- INICIO CONSULTAR USUARIO -----------------
    app.get('/vendas/consultar/idUsuario/:idUsuario', (req, res) => {
        let idUsuario = req.params.idUsuario;
        if(isNaN(idUsuario)){
            res.send(errorMsg["consultar"][5]);
        } else {
            let resultJson = '';
            let connection = app.infra.connectionFactory();
            let lstEspecifica = new app.infra.applicationDAO(connection);
            lstEspecifica.usuarioEspecifico(idUsuario, function (err, results) {
                console.log(results);
                if (results.length === 0) {
                    res.send(errorMsg["consultar"][4]);
                } else {
                    res.send(results);
                }
            });
            connection.end();
        }
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
        if(results.length === 0){
            res.send(errorMsg["consultar"][3]);
        } else {
            res.send(results);
        }
    });
    connection.end();
    });
    // ---------------------- FIM CONSULTAR DATA -----------------
// ---------------------- FIM CONSULTAR -----------------

// ---------------------- INICIO INSERIR -----------------
    app.post('/vendas/incluir',(req, res) => {
        let venda = req.body;
        if(isNaN(venda["idProduto"])
            || isNaN(venda["idUsuario"])
            || typeof venda["dtVenda"] !== 'string'
            || typeof venda["statusVenda"] !== 'string'
            || venda["dtVenda"].length !== 10){
                res.send(errorMsg["inserir"][1]);
        } else {
            let resultsJson = '';
            let connection = app.infra.connectionFactory();
            let inserir = new app.infra.applicationDAO(connection); //applicationDAO em minusculo
            inserir.salva(venda, function (err, results) {
                if (results["warningCount"] !== 0) {
                    res.send(errorMsg["inserir"][0]);
                } else {
                    res.status(200).send(errorMsg['inserir'][0]);
                }
            });
            connection.end();
        }
    });
// ---------------------- FIM INSERIR -----------------

// ---------------------- INICIO ATUALIZAR -----------------
    app.put('/vendas/editar',(req, res) => {
        let params = req.body;
        console.log('REQ.BODY: ', params);
    //console.log(params);
    let info = params["info"];

    console.log('params["info"]: ', params["info"]);
    var keysInfo = [];
    Object.keys(info).forEach(function(key) {
        keysInfo = key;
        console.log(keysInfo);
    });
        let id = params["id"];

    console.log('params["id"]: ', params["id"]);
        //console.log(id);
        let resultJson = '';
        let connection = app.infra.connectionFactory();
        let atualizar = new app.infra.applicationDAO(connection);
        atualizar.atualiza(info, id, function (err, results) {
            res.send(errorMsg['alterar'][0]);
        });
        connection.end();
});
// ---------------------- FIM ATUALIZAR -----------------

// ---------------------- INICIO DELETAR -----------------
    app.delete('/vendas/excluir/', (req,res) => {
        let idVendas = req.body.idVendas;
        console.log(idVendas);
        if (isNaN(idVendas)) {
            res.send(errorMsg["excluir"][0]);
        } else {
            console.log(idVendas);
            let resultJson = '';
            let connection = app.infra.connectionFactory();
            let deletar = new app.infra.applicationDAO(connection);
            deletar.deleta(idVendas, function (err, results) {
                res.end();
            });
            connection.end();
        }
    });

// ---------------------- FIM DELETAR -----------------
};