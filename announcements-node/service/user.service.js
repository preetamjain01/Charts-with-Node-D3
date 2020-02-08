const DBService = require('../shared/db.service');
const {DBNAME, USER_COLLECTION} = require('../shared/app-constants');
const mailer = require('../shared/mailer.service');
const generator = require('generate-password');
const ObjectID = require('mongodb').ObjectID;
const common = require('./common.service');

exports.createUser = async function (body) {
    try {
        let userObject = await DBService.findOne({$or: [{username: body.username}, {email: body.email}]}, DBNAME, USER_COLLECTION);
        console.log("Userobject", userObject);
        if (userObject) {
            if (userObject.email === body.email) {
                throw new Error("User with this email already present");
            } else if (userObject.username === body.username) {
                throw new Error("User with this username already present");
            }
        } else {
            let userInfo = {
                username: body.username,
                password: body.password,
                firstName: body.firstname,
                lastName: body.lastname,
                email: body.email,
                phone: body.phone,
                role: 'USER_ROLE',
                credits: 10
            };

            let insertResult = await DBService.insertOne(userInfo, DBNAME, USER_COLLECTION);

            if (insertResult === 1) {
                let mailOptions = mailer.createMailConfiguration(body.email, 'Welcome to Charts', 'Hi, Welcome to Charts. You are now registered and ready to create dynamic charts and announcements.', "");
                mailer.sendMail(mailOptions);
                return true;
            }
        }
    } catch (error) {
        throw error.message;
    }
};

exports.forgotPassword = async function (email) {

    try {

        let userObject = await DBService.findOne({email: email}, DBNAME, USER_COLLECTION);

        console.log("User Object", userObject);

        if (userObject) {

            let password = generator.generate({length: 8, numbers: true});

            let result = await mailer.sendMail(mailer.createMailConfiguration(email, 'New Password for Charts', `Your new password is ${password}`));

            console.log("Result", result.accepted.length === 1);

            if (result) {
                let updateStatus = await DBService.findOneAndUpdate(
                    {email: email},
                    DBNAME,
                    USER_COLLECTION,
                    {$set: {password: password}}
                );

                console.log('Update Status', updateStatus);

                if (updateStatus.ok === 1) return true;
            }
        } else {
            throw new Error("This email Id is not registered with us. Please enter the correct one");
        }
    } catch (err) { throw err };
};

exports.updateUser =  async function (user, id) {

    try {
        let updatedUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            credits: user.credits
        };

        let result = await DBService.replaceOne({_id: ObjectID(id)}, DBNAME, USER_COLLECTION, updatedUser);
        console.log("Outside", result);
        if (result.ok === 1) {
            console.log("Inside");
            let userData = await DBService.findOne({_id: ObjectID(id)}, DBNAME, USER_COLLECTION);
            console.log('userData', userData);
            if (userData) {
                return userData;
            } else {
                throw new Error("Updated user not found");
            }
        } else {
            throw new Error("Unable to update user details");
        }
    } catch (error) {
        throw error;
    }

};

exports.getCredits = async function (token) {
    try {
        let userInfo = await common.decodeToken(token);
        //console.log(userInfo);
        let result = await DBService.findOne({_id: ObjectID(userInfo.user._id)}, DBNAME, USER_COLLECTION);
        console.log("Credits", result.credits);
        return result.credits;

    } catch (error) {
        throw error;
    }
};

exports.addCredits = async function (credits, token) {
    try {
        let userInfo = await common.decodeToken(token);
        console.log(userInfo);
        let result = await DBService.findOneAndUpdate({_id: ObjectID(userInfo.user._id)}, DBNAME, USER_COLLECTION, {$inc: {credits: credits}});
        if (result.ok === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};