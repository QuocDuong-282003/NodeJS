const { reject } = require("lodash")
import db from "../models/index";
let getHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.name || !data.imageBase64 ||
                !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Handbook.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
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

let getAllHandBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {

                    item.image = new Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e)
        }

    })
}
// let getDetailHandBookById = (inputId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!inputId) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing parameter'
//                 })
//             } else {
//                 let data = await db.Handbook.findOne({
//                     where: {
//                         id: inputId
//                     },
//                     attributes: ['descriptionHTML', 'descriptionMarkdown'],
//                 })
//                 // if (data) {
//                 //     let arrHandBook = [];
//                 //     arrHandBook = await db.Doctor_Infor.findAll({
//                 //         where: { clinicId: inputId },
//                 //         attributes: ['doctorId', 'provinceId'],
//                 //     })
//                 //     //do something
//                 //     data.arrHandBook = arrHandBook;

//                 // } else data = {}

//                 resolve({
//                     errMessage: 'ok',
//                     errCode: 0,
//                     data
//                 })
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
let getDetailHandBookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                });
            } else {
                let data = await db.Handbook.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                });

                if (data) {
                    // Nếu bạn cần sử dụng phần mã đã comment, hãy bỏ comment và chỉnh sửa như sau:
                    // let arrHandBook = await db.Doctor_Infor.findAll({
                    //     where: { clinicId: inputId },
                    //     attributes: ['doctorId', 'provinceId'],
                    // });
                    // data.arrHandBook = arrHandBook;

                    resolve({
                        errMessage: 'ok',
                        errCode: 0,
                        data
                    });
                } else {
                    resolve({
                        errMessage: 'Handbook not found',
                        errCode: 2,
                        data: {}
                    });
                }
            }
        } catch (e) {
            reject({
                errMessage: 'Internal server error',
                errCode: 500,
                error: e
            });
        }
    });
};

module.exports = {
    getHandBook: getHandBook,
    getAllHandBook: getAllHandBook,
    getDetailHandBookById: getDetailHandBookById
}