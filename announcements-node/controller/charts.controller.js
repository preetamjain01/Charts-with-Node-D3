const chartsService = require('../service/charts.service');
const d3nBar = require('d3node-barchart');
const d3nPie = require('d3node-piechart');
const d3nLine = require('d3node-linechart');
const d3 = require('d3-node')().d3;
const parseTime = d3.timeParse('%d-%b-%y');

exports.createBarChart = async function (req, res) {
    if (req.file && req.body.barChartKeys) {

        try {
            let chartData = await chartsService.createBarChart(req.file, JSON.parse(req.body.barChartKeys));

            res.status(200).send({
                success: true,
                payload: chartData,
                message: "Bar Chart created",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Something went wrong. Please try again",
            })
        }

    } else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }
};

exports.createDonutChart = async function (req, res) {
    if (req.file && req.body.donutChartKeys) {
        try {
            let chartData = await chartsService.createDonutChart(req.file, JSON.parse(req.body.donutChartKeys));

            res.status(200).send({
                success: true,
                payload: chartData,
                message: "Donut Chart created",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Something went wrong. Please try again!",
            })
        }

    } else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }

};

exports.createPieChart = async function (req, res) {
    if (req.file && req.body.pieChartKeys) {
        try {
            let chartData = await chartsService.createPieChart(req.file, JSON.parse(req.body.pieChartKeys));

            res.status(200).send({
                success: true,
                payload: chartData,
                message: "Pie Chart created",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Something went wrong. Please try again!",
            })
        }
    } else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }
};

exports.createLineChart = async function (req, res) {

    if (req.file && req.body.lineChartKeys) {
        let htmlFile = await
            chartsService.createLineChart(req.file, JSON.parse(req.body.lineChartKeys));
        res.status(200).send({
            success: true,
            payload: htmlFile,
            message: "Chart created",
        })
    }
};

exports.createLineChart = async function (req, res) {
    if (req.file && req.body.lineChartKeys) {

        try {
            let chartData = await chartsService.createLineChart(req.file, JSON.parse(req.body.lineChartKeys));
            res.status(200).send({
                success: true,
                payload: chartData,
                message: "Chart created",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Something went wrong",
            })
        }

    } else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }
};
// exports.createLineChart = function (req, res) {
//     console.log("File", req.file);
//     csv.parse(req.file.buffer, function(err, data){
//         if (err) throw err;
//         csv.stringify(data, function(err, data1){
//             console.log(data1);
//             let test = d3.tsvParse(data1, function(d) {
//                 return {
//                     key: parseTime(d.date),
//                     value: +d.close
//                 };
//             });
//             console.log(test);
//             output('./output', d3nLine({ data: test }));
//         });
//     });
// };


exports.saveGeneratedChart = async function (req, res) {
    if (req.body.fileName && req.body.chart) {
        try {
            let result = await chartsService.saveChart(req.body, req.header('x-access-token'));
            if (result === 1) {
                res.status(200).json({
                    success: true,
                    message: "Chart saved successfully"
                })
            } else {
                throw new Error();
            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Something went wrong",
            })
        }
    }
    else {
        res.status(400).send({
            success: false,
            message: "File name missing",
        })
    }
};

exports.getCharts = async function (req, res) {
    try {

        let allCharts = await chartsService.getCharts(req.header('x-access-token'));

        res.status(200).json({
            success: true,
            payload: allCharts,
            message: "All user charts"
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Data not found",
        })
    }

};

