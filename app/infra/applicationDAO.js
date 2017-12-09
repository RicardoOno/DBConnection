/**
 * Created by Tadashi on 03/11/2017.
 */

function applicationDAO(connection) {
    this._connection = connection;
};

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
    console.log('DAO: ', dtVenda);
    this._connection.query('select * from vendas where dtVenda = ' + (dtVenda.toString()), callback);

};

//INSERT INTO `vendas` (`idVendas`, `idProduto`, `idUsuario`, `dtVenda`, `statusVenda`) VALUES (NULL, '1', '1', CURRENT_DATE(), 'Disponivel');


applicationDAO.prototype.salva = function (produto, callback) {
    this._connection.query('insert into vendas set ?', produto, callback);
    //this._connection.query('insert into livros (nome) values (?)');
};
applicationDAO.prototype.deleta = function (id, callback) {
    this._connection.query('delete from vendas where ?', id, callback);
};
applicationDAO.prototype.atualiza = function (produto, id, callback) {
    this._connection.query('update tkpp set ? where vendas.id ='+ id, produto, callback);
};


module.exports = function(){
    return applicationDAO;
}