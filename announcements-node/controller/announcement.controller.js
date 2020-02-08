const {USER_ROLE, DBNAME, SECRET, USER_COLLECTION} = require('../shared/app-constants');
const announceService = require('../service/announcement.service');

exports.createAnnouncement = async function (req, res) {
    if (req.body.editorContent && req.body.receivers) {
        //console.log(req.body.editorContent);
        let result = await announceService.createAnnouncement(req.body.editorContent, req.body.receivers, req.header('x-access-token'));

        if (result) {
            if (result.rejected.length === 0) {
                res.status(200).send({
                    success: true,
                    message: "Announcement successfully created",
                })
            } else if (result.rejected.length > 0){
                res.status(400).send({
                    success: false,
                    message: "Could not create announcement for some receivers",
                })
            }
        }
    } else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }
};