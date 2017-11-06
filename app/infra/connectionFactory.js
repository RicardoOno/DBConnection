/**
 * Created by Tadashi on 03/11/2017.
 */
var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host: '127.0.0.1',
        port: '3002',
        user: 'root',
        password: 'usbw',
        database:'statistic'
    });
}

module.exports = function(){
    return createDBConnection;
}