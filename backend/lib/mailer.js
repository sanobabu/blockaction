/**
 * Created by sazack on 7/21/17.
 */

const econfig = require('../config/email.config');
const NiceMail = require('nicemail');

const nm = new NiceMail(econfig, econfig.template);

const util = require('util');
module.exports = {
    sendMail: (options,cb)=>{
        
        if(options){
            let emailOptions = {
                template: options.template,
                subject: options.subject,

            }

            if(options.receiver) {
                emailOptions.to = options.receiver  ;
            }

            if(options.content) {
                emailOptions.content = options.content;
            }

            switch(emailOptions.template){
                case 'subscribe':
                    emailOptions.subject = 'Subscription confirmation';
                    break;
                case 'requestether':
                    emailOptions.subject = 'Ether request';
                    break;
                case 'requestbitcoin':
                    emailOptions.subject = 'Bitcoin request';
                    break;
                case 'contact':
                    emailOptions.subject = 'Somebody just contacted you';
                    break;
                case 'feedback':
                    emailOptions.subject = 'You have a feedback';
                    break;
                case 'thankyoufeedback':
                    emailOptions.subject = 'Thank you for your feedback';
                    break;
                case 'thankyoucontact':
                    emailOptions.subject = 'Thank you for contacting us';
                    break;
                case 'report-feedback':
                    emailOptions.subject = 'Feedback Report';
                    break;

                default:
            }

            nm.send(emailOptions)
                .then( res => cb(null, res))
                .catch( err => cb(err)); 
        }

        else{
            cb("No emailing details provided");
        }

    }
}



