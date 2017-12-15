/**
 * Created by Tadashi on 03/11/2017.
 */
var app = require('./express-config/custom-express')();
var cors = require('cors');

var corsOptions = ({
    credentials: true,
    origins: [
        'http://localhost:8000',
        'http://localhost:3000',
        'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'
    ],
    optionsSuccessStatus: 200
});

// parametros: porta, ip, ...
app.listen(8000, cors(corsOptions), function () {
    console.log('====> Servidor ligado <====');
});
