/**
 * Created by Tadashi on 03/11/2017.
 */

function applicationDAO(connection) {
    this._connection = connection;
};
// ---------------------- INICIO SELECT -----------------
applicationDAO.prototype.lista = function(callback) {
      this._connection.query('select * from vendas', callback);
};

applicationDAO.prototype.vendaEspecifica = function(idVenda, callback) {
    this._connection.query('select * from vendas where idVendas = '+ idVenda, callback);
};

applicationDAO.prototype.produtoEspecifico = function(idProduto, callback) {
    this._connection.query('select * from vendas where idProduto = '+ idProduto, callback);
};

applicationDAO.prototype.usuarioEspecifico = function(idUsuario, callback) {
    this._connection.query('select * from vendas where idUsuario = '+ idUsuario, callback);
};

applicationDAO.prototype.dataEspecifica = function(dtVenda, callback) {
    var dtVenda = '"'+dtVenda+'"';
    this._connection.query('select * from vendas where dtVenda = ' + dtVenda, callback);

};
// ---------------------- FIM SELECT -----------------

// ---------------------- INICIO INSERT -----------------
applicationDAO.prototype.salva = function (venda, callback) {
    this._connection.query('insert into vendas set ?', venda, callback);
    //this._connection.query('insert into livros (nome) values (?)');
};
// ---------------------- FIM SELECT -----------------


// ---------------------- INICIO DELETE -----------------
applicationDAO.prototype.deleta = function (idVendas, callback) {
    this._connection.query('delete from vendas where idVendas = ' +idVendas, callback);
};
// ---------------------- FIM DELETE -----------------

// ---------------------- INICIO UPDATE -----------------
applicationDAO.prototype.atualiza = function (info, id, callback) {
    this._connection.query('update vendas set ? where vendas.idVendas = '+ id, info, callback);
};
// ---------------------- FIM UPDATE -----------------

module.exports = function(){
    return applicationDAO;
}