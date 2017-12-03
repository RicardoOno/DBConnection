/**
 * Created by Tadashi on 03/11/2017.
 */
function applicationDAO(connection) {
    this._connection = connection;
};

applicationDAO.prototype.lista = function(callback) {
    this._connection.query('select * from tkpp', callback);
};

applicationDAO.prototype.salva = function (produto, callback) {
    this._connection.query('insert into tkpp set ?', produto, callback);
    //this._connection.query('insert into livros (nome) values (?)');
};
applicationDAO.prototype.deleta = function (id, callback) {
    this._connection.query('delete from tkpp where ?', id, callback);
};
applicationDAO.prototype.atualiza = function (produto, id, callback) {
    this._connection.query('update tkpp set ? where tkpp.id ='+ id, produto, callback);
};


module.exports = function(){
    return applicationDAO;
}