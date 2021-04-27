var nodemailer = require('nodemailer');


async function send_confirmation(req,res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'software.hotelhenry@gmail.com',
            pass: 'laclande123'
        }
    
 })
    var mailOptions = {
        from: 'Remitente',
        to: 'rodrigo.v.7997@gmail.com',
        subject: 'Asunto',
        text: 'MERCADO PAGO TE DETESTO'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).json(req.body);
    }
});

}


module.exports={send_confirmation}