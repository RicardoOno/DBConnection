/**
 * Created by Tadashi on 03/11/2017.
 */
var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host: '127.0.0.1',
        port: '3307',
        user: 'root',
        password: '',
        database: 'dbvenda'
    });
}

module.exports = function(){
    return createDBConnection;
}