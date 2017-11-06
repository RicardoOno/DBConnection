/**
 * Created by Tadashi on 03/11/2017.
 */
function applicationDAO(connection) {
    this._connection = connection;
};

applicationDAO.prototype.lista = function(callback) {
    this._connection.query('select * from teste', callback);
};

applicationDAO.prototype.salva = function (produto, callback) {
    this._connection.query('insert into teste set ?', produto, callback);
    //this._connection.query('insert into livros (nome) values (?)');
};
applicationDAO.prototype.deleta = function (id, callback) {
    this._connection.query('delete from teste where ' + id, callback);
};


module.exports = function(){
    return applicationDAO;
}