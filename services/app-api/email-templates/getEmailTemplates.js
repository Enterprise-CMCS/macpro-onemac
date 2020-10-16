import SPAEmailTemplates from './SPAEmailTemplates.js';
import SPARAIEmailTemplates from './SPARAIEmailTemplates.js';
import WaiverEmailTemplates from './WaiverEmailTemplates.js';
import DefaultEmailTemplates from './DefaultEmailTemplates.js';

export default function getEmailTemplates(type) {
  let retval = {};

    switch(type) {
        case 'waiver':
            retval = WaiverEmailTemplates;
            break;
        case 'spa':
            retval = SPAEmailTemplates;
            break;
        case 'sparai':
              retval = SPARAIEmailTemplates;
              break;
        default:
            retval = DefaultEmailTemplates;
            break;
    }

    return retval;
}
