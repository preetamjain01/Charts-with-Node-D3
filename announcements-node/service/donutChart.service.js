const csv = require('csv');
const d3 = require('d3-node')().d3;
const output = require('d3node-output');
const {createFile} = require('./outputService');
const d3nDonut = require('../util/d3Donut');


exports.createDonutChart = function (file, keys) {

    return new Promise((resolve, reject) =>{
        csv.parse(file.buffer, function(err, data){
            if (err) throw err;
            csv.stringify(data, function(err, stringData) {
                console.log(stringData);
                let d3parsedData = d3.csvParse(stringData, function (parsedData) {
                    return {
                        label: parsedData[keys.xaxis],
                        value: parsedData[keys.yaxis]
                    };
                });
                createFile('./chartsOutput/DonutChart', d3nDonut({data:d3parsedData})).then((htmlFile) => {
                    resolve(htmlFile);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};