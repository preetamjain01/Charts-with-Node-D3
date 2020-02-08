const jwt = require('jsonwebtoken');
const {SECRET} = require('../shared/app-constants');

exports.decodeToken = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) reject(err);
            //console.log('Decoded', decoded);
            resolve(decoded);
        });
    })
};