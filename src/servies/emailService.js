
require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Ví dụ cho Gmail
        port: 465, // Cổng cho SSL
        secure: true, // true cho SSL
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let getBodyHTMLEmail = (language) => {
        let result = '';
        if (dataSend.language === 'vi') {
            result =
                `
                <h3>Xin chào ${dataSend.patientName} !</h4>
                <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare </p>
                <p>Thông tin đặt lịch khám bệnh: </p>
                <div><b>Thời gian: ${dataSend.time}</b></div>
                <div><b>Bác sĩ : ${dataSend.doctorName}</b></div>

                <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào đường link bên dưới 
                để xác nhận hoàn tất thủ tục đặt lịch khám bệnh. </p>
                <div>
                <a href=${dataSend.redirectLink} target="_blank">Click here</a>
                </div>
                <div>Xin chân thành cảm ơn !</div>
                `
        }
        if (dataSend.language === 'en') {
            result =
                `
                <h3>Dear ${dataSend.patientName} !</h4>
                <p>You received this email because you booked an online medical appointment on BookingCare</p>
                <p>Information on scheduling medical examinations: </p>
                <div><b>Times: ${dataSend.time}</b></div>
                <div><b>Doctor : ${dataSend.doctorName}</b></div>

                <p>If the above information is true, please click on the link below
          to confirm completion of medical examination scheduling procedures. </p>
                <div>
                <a href=${dataSend.redirectLink} target="_blank">Click here</a>
                </div>
                <div>Sincerely thank !</div>
                `
        }
        return result;
    }
    async function main() {
        try {
            const info = await transporter.sendMail({
                from: '"Quốc Dương 👻" <baoduong2972003@gmail.com>', // địa chỉ người gửi
                to: dataSend.receiverEmail, // danh sách người nhận
                subject: "Thông tin đặt lịch khám bệnh ✔", // Dòng chủ đề
                text: "Hello world?", // Nội dung văn bản
                html: getBodyHTMLEmail(dataSend), // Nội dung HTML
            });

            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }

    await main(); // Gọi hàm main
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
            <h3>Xin chào ${dataSend.patientName} !</h4>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare </p>
            <p>Thông tin đặt lịch khám bệnh: </p>
           
             <p>Thông tin đơn thuốc được gửi trong file đính kèm. </p>
          
            <div>Xin chân thành cảm ơn !</div>
            `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Dear ${dataSend.patientName} !</h4>
            <p>You received this email because you booked an online medical appointment on BookingCare</p>
            <p>Information on scheduling medical examinations: </p>
          <p>âskahsas</p>
            <div>Sincerely thank !</div>
            `
    }
    return result;
}
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {

        try {


            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", // Ví dụ cho Gmail
                port: 465, // Cổng cho SSL
                secure: true, // true cho SSL
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });
            //send mail with defined transport object
            let info = await transporter.sendMail({
                form: '"Quốc Dương " <baoduong2972003@gmail.com>',// sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh ",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png}`,
                        // content: dataSend.imgBase64.split("base64,")[1],
                        // encoding: 'base64',
                        content: 'aGVsbG8gd29ybGQh',
                        encoding: dataSend.imgBase64,
                    }
                ],

            });
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
};



