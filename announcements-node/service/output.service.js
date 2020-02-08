const fs = require('fs');
const svg2png = require('svg2png');

//code to get the image output of the charts created
exports.createFile = function (dest, d3n) {

    return new Promise((resolve, reject) => {
        let svgBuffer = new Buffer(d3n.svgString(), 'utf-8');

        svg2png(svgBuffer)
            .then(buffer => fs.writeFile(dest+'.png', buffer, (err) => {
                if (err) reject(err);
                console.log('>> Exported: "'+dest+'.png"');
                fs.readFile(dest+'.png', {encoding: 'base64'}, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            }))
    });
};
