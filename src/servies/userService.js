import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let handUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {

        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }

    })
}
let handleUserLogin = (email, password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'], // hàm hiển thị theo yêu cầu 
                    where: { email: email },
                    raw: true

                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password); // false
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok',

                            delete user.password; // xóa password ko hiễn thị ra 
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';

                    }

                } else {

                    userData.errCode = 2;
                    userData.errMessage = `User's isn't found`
                }


            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email`

            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ // chạy vào db và quét all trong db
                where: { email: userEmail }
            })
            // user != undfine
            if (user) { // nếu tim thấy email người dùng nhập vào == trong db => trả về kết quả
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: { // get all but password
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { // get all but password
                        exclude: ['password']
                    }

                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ???
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used , Plz try other email'
                })
            } else {
                let handPasswordFromBcrypt = await handUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: handPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar

                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({ // if search user and have in db -> return {} or contrary to return undefined
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }

        await db.User.destroy({// thao tac duoi db
            where: { id: userId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The user is deleted'
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({ // 1. tìm người dùng trong csdl
                where: { id: data.id },  // điều kiện where id= id người dùng truyền vào 
                raw: false
            })
            if (user) {  // sau khi tìm đc user . bắt đầu cập nhật thong tin các use theo biến data
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }

                await user.save();
                // await db.User.save({

                //     firstName:data.firstName,
                //     lastName:data.lastName,
                //     address:data.address
                // },{ where:{id: userId}})


                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds! '
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters ! '
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}