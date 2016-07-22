var nodemailer = require('nodemailer');
var router = require('express').Router();

module.exports = router;
router.post('/', confirmationEmail);

function confirmationEmail(req, res) {
    //Need to put this in .gitignore file
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ghaboozebox@gmail.com',
            pass: 'gracehopper123'
        }
    });

    var mailOptions = {
        from: '"BoozeBox" <ghaboozebox@gmail.com>',
        to: req.body.recipientEmail,
        subject: 'Order Confirmed: Thank you for your purchase',
        html: confirmationEmailContent(req.body.name)
    };


    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            console.log(info.response);
            res.json({ emailsent: info.response });
        };
    });
}

//for some reason interpolation doesn't work....:(
var confirmationEmailContent = function(name) {
    return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0"/></head><body> <span style="color:#fff">Our cocktails boxes are fun and expertly concoted together. We craft drinks to all palates. Let us know your preferences and we will personalize a box specially for you!</span> <table class="deviceWidth" align="center" cellpadding="0" cellspacing="10" width="600" style="border:1px solid #2C3E50; color: #2C3E50; background-color:#ccc"> <tr> <td> <table cellpadding="0" cellspacing="0"> <tr> <td style="background-color:#fff" align="center"><img height="50px" src="http://s31.postimg.org/x6j6xxgez/logo.png" class="logo"/> </td></tr><tr> <td align="center"> <img width="100%" class="mainbanner" style="border-bottom: 5px solid #fff" src="http://files.clubplanet.com/SiteFiles%5CArticleImages%5C7987%5Ccocktails_header.jpg"/> </td></tr></table> </td></tr><tr> <td class="contentTable" style="background-color:#fff"> <table class="deviceWidth" cellpadding="0" cellspacing="10px" style="border: 1px solid #ccc;"> <tr> <td class="aside" width="25%" align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#2C3E50; padding:10px; border-right: 1px #848484 solid;"> <b>CONTACT US</b> <br/> <img src="http://merchant.linksynergy.com/fs/banners/13550/13550_10008233.png?rand=3806622"/> <br/> <span style="font-family:Arial, Helvetica, sans-serif; font-size:12px;">Comments? Questions? We&rsquo;d love to hear from you!<br/> <a style="color:#e01f7c" href="mailto:ghaboozebox@gmail.com">Email</a></span> <br/> <br/> </td><td class="rightContent" width="75%" align="left" style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#2C3E50; padding:10px;"> <span style="font-size:18px;"><b>CONFIRMATION NO. 56391072</b></span><br><br/>Dear ' + name + ',<br><br>Thank you for ordering from BoozeBox. We’ll send a confirmation when your booze ship! <table> <tr> <td> <table align="left" cellpadding="0" cellspacing="0"> <tr> <td align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#2C3E50;"> <br/> <B>ORDER DETAIL</B> <br/> </td></tr></table> </td></tr><tr> <td> <table cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#e01f7c; padding:5px 0px; "><strong>Individual Box: Corpse Reviver #2</strong> <br><span style="font-size:12px">Price: $49.99 x 1</span> </tr><!-- <tr> <td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#e01f7c; padding:5px 0px; "><strong>Subscription Box: Bold Basic</strong> <br><span style="font-size:12px">3 Months: June - August 2016<br>Price: $39.99 x 3</span> </tr>--> <tr> <td style="padding-top: 10px;font-size:16px"><b>TOTAL CHARGE: $49.99</b> </td></tr></table> </td></tr></table> <br/> Thank You, <br/> The BoozeBox Team <br/> </td></tr></table> </td></tr></body></html>'
};