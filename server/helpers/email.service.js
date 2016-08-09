import nodemailer from 'nodemailer';
import config from '../config/env';
import emailTemplates from 'email-templates';
import path from 'path';

const templatesDir = path.resolve(__dirname, '..', 'views/mailer');


export default new class EmailService
{
    
    constructor(){
        this.transporter = nodemailer.createTransport(config.smtp)
    }

    /**
     * Send email
     * @param templateName
     * @param data
     */
    
    send(templateName, locals, fn){
        let self = this;
        emailTemplates(templatesDir, function (err, template) {
            if (err) {
                //console.log(err);
                return fn(err);
            }
            // Send a single email
            template(templateName, locals, function (err, html, text) {
                if (err) {
                    //console.log(err);
                    return fn(err);
                }
                // if we are testing don't send out an email instead return
                // success and the html and txt strings for inspection
                if (process.env.NODE_ENV === 'test') {
                    return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
                }
                
                self.transporter.sendMail({
                    from: config.default.smtp.from,
                    to: locals.email,
                    subject: locals.subject,
                    html: html
                    // generateTextFromHTML: true,
                    //text: text
                }, function (err, responseStatus) {
                    if (err) {
                        return fn(err);
                    }
                    return fn(null, responseStatus.message, html, text);
                });
            });
        });
    }
    
    registrationEmail(data, callback){
        this.send('registration_confirm', {
            email: data.email || '',
            activateUrl: `${config.default.host}v1/users/activate/${data.token}/`,
            subject: "Registration Activate"
        }, callback)
    }
}