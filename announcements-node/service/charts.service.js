const csv = require('csv');
const d3 = require('d3-node')().d3;
const d3nBar = require('d3node-barchart');
const d3nPie = require('d3node-piechart');
const d3nLine= require('d3node-linechart');
const d3nDonut = require('../util/d3Donut');
const tsv = require('tsv');
const {createFile} = require('./output.service');
const parseTime = d3.timeParse('%d-%b-%y');
const commonService = require('./common.service');
const DBService = require('../shared/db.service');
const {DBNAME, CHARTS_COLLECTION} = require('../shared/app-constants');


/**
 * Function to create bar chart with user data.
 * @param file - CSV file uploaded by user
 * @param keys - X and Y axis values for bar chart
 * @returns {Promise<any>} resolving to bar chart
 */

exports.createBarChart = function (file, keys) {
    return new Promise((resolve, reject) => {
        //Parse CSV File
        csv.parse(file.buffer, function (err, data) {
            if (err) throw err;

            csv.stringify(data, function (err, stringData) {
                let d3parsedData = d3.csvParse(stringData, function (parsedData) {
                    return {
                        key: parsedData[keys.xaxis],
                        value: parsedData[keys.yaxis]
                    };
                });

                let timestamp = Date.now();
                createFile(`./chartsOutput/barChart${timestamp}`, d3nBar({data: d3parsedData})).then((chart) => {
                    resolve({chart, fileName : `barChart${timestamp}`});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};

/**
 * Function to create donut chart with user data.
 * @param file - CSV file uploaded by user
 * @param keys - X and Y axis values for donut chart
 * @returns {Promise<any>} resolving to donut chart
 */
exports.createDonutChart = function (file, keys) {
    return new Promise((resolve, reject) => {
        //Parse Csv File
        csv.parse(file.buffer, function (err, data) {
            if (err) throw err;

            csv.stringify(data, function (err, stringData) {
                //console.log(stringData);
                let d3parsedData = d3.csvParse(stringData, function (parsedData) {
                    return {
                        label: parsedData[keys.label],
                        value: parsedData[keys.values]
                    };
                });

                let timestamp = Date.now();
                createFile(`./chartsOutput/donutChart${timestamp}`, d3nDonut({data: d3parsedData})).then((chart) => {
                    resolve({chart, fileName : `donutChart${timestamp}`});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};

/**
 *  Function to create pie chart with user data.
 * @param file - CSV file uploaded by user
 * @param keys -
 * @returns {Promise<any>}resolving to pie chart
 */
exports.createPieChart = function (file,keys) {
    return new Promise((resolve, reject) =>{
        //Parse CSV file
        csv.parse(file.buffer, function(err, data){
            if (err) throw err;
            csv.stringify(data, function(err, stringData) {

                let d3parsedData = d3.csvParse(stringData, function (parsedData) {
                    return {
                        label: parsedData[keys.label],
                        value: parsedData[keys.values]
                    };
                });

                let timestamp = Date.now();
                createFile(`./chartsOutput/pieChart${timestamp}`, d3nPie({data:d3parsedData})).then((chart) => {
                    resolve({chart, fileName : `pieChart${timestamp}`});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};

/**
 *  Function to create line chart with user data.
 * @param file - CSV file uploaded by user
 * @param keys - X and Y axis values for line chart
 * @returns {Promise<any>}resolving to line chart
 */
exports.createLineChart = function (file, keys) {

    return new Promise((resolve, reject) => {
        csv.parse(file.buffer, function(err, data){
            if (err) throw err;
            csv.stringify(data, function(err, stringData) {

                let d3parsedData = d3.csvParse(stringData, function (parsedData) {
                    return {
                        key: parsedData[keys.xaxis],
                        value: parsedData[keys.yaxis]
                    };
                });

                let timestamp = Date.now();
                createFile(`./chartsOutput/lineChart${timestamp}`, d3nLine({data:d3parsedData})).then((chart) => {
                    resolve({chart, fileName : `lineChart${timestamp}`});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};

exports.saveChart = async function (chartData, token) {
    try {
        let userInfo = await commonService.decodeToken(token);

        let chart = {
            username: userInfo.user.username,
            fileName: chartData.fileName,
            chartName: chartData.chartName,
            chart: chartData.chart
        };
        let result = await DBService.insertOne(chart, DBNAME, CHARTS_COLLECTION);
        return result;

    } catch (error) {
        return error;
    }
};

exports.getCharts = async function (token) {
    try {
        let userInfo = await commonService.decodeToken(token);

        let result = await DBService.find({username:userInfo.user.username}, DBNAME, CHARTS_COLLECTION);

        if (result.length > 0) {
            return result;
        } else {
            throw new Error("No records in database");
        }
    } catch (error) {
        return error;
    }
};

