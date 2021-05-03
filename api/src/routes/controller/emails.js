var nodemailer = require('nodemailer');


const confirmation_email = async (req, res) => {
    const {
        first_name,
        last_name,
        uuid,
        country,
        checkin,
        checkout,
        category,
        type,
        paxes,
        email } = req.body

    contentHTML = `
        <div>HOLA A TODOS BROTHER<div>
        <span> asdsadsas <span>
    `;
    console.log(contentHTML)


    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'software.hotelhenry@gmail.com',
            pass: 'zjyhnxrvdjrnsyrx'
        }
    })
    var mailOptions = {
        from: "'HenryHotel' <software.hotelhenry@gmail.com>",
        to: `${email}`,
        subject: 'Booking Info',
        html: `
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                        <h1> HENRY HOTEL </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Thanks for choose Henry Hotel </h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                       
            <h2> This is the information about your booking</h2>
            <h3> Titular info </h3>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>First name :</strong> ${first_name}</p>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>Last name :</strong> ${last_name}</p>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>Personal ID :</strong> ${uuid}</p>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>Country :</strong> ${country}</p>
            <h3> Booking Info</h3>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>Category select :</strong> ${category} - ${type}</p>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>Check in date :</strong> ${checkin}</p>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>Check out date :</strong> ${checkout}</p>
            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"><strong>Guests :</strong> ${paxes}</p>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>HENRY HOTEL</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
            `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message Sent", info.messageID)
    res.send('hola')
}
const cancel_email = async (req, res) => {
    const { email, positive_balance } = req.body


    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'software.hotelhenry@gmail.com',
            pass: 'zjyhnxrvdjrnsyrx'
        }
    })
    var mailOptions = {
        from: "'HenryHotel' <software.hotelhenry@gmail.com>",
        to: `${email}`,
        subject: 'Cancel Booking',
        html: `
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                <h1> HENRY HOTEL </h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"> Booking cancelled </h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                               
                    <h2> Positive Balance:  ${positive_balance}</h2>                 
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>HENRY HOTEL</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table> `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message Sent", info.messageID)
    res.send('hola')
}

const newsletter_email = async (req, res) => {

    const { email_title, email_content, email_image } = req.body[0]
    const emails = req.body[1]
   


    for(let i =0; i<emails.length;i++){

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'software.hotelhenry@gmail.com',
            pass: 'zjyhnxrvdjrnsyrx'
        }
    })   
    var mailOptions = {
        from: "'HenryHotel' <software.hotelhenry@gmail.com>",
        to: `${emails[i].email}`,
        subject: 'Henry Hotel Newsletter',
        html: `
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                    <h1> HENRY HOTEL </h1>
                    </td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">${email_title}</h1>
                                    <span
                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                   
        <h2> ${email_content}</h2>
                                 <img src='${email_image}' alt=''>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>HENRY HOTEL</strong></p>
                    </td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
        `
    };

    const info = await transporter.sendMail(mailOptions);
}
   
    res.send('hola')
}



module.exports = { confirmation_email, cancel_email, newsletter_email }