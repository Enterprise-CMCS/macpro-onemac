export const ACCESS_CONFIRMATION_EMAILS = {
    stateuser: {
        pending: {
            subjectLine: "Your OneMAC Role Access is Pending Review",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>We received your request as a [insert role requested] on [insert date/time stamp]. 
            Your request is pending review and you will receive a confirmation receipt when your status is reviewed.</p>
    
            <p>Thank you!</p>`
        },
        granted: {
            subjectLine: "Your OneMAC Portal State access for [insert state] has been granted!",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>Your access to the information for [insert state] has been granted. 
            If you have any questions, please reach out to your State Administrator.</p>
    
            <p>Thank you!</p>`
        },
        denied: {
            subjectLine: "Your OneMAC Portal State access for [insert state] has been denied",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>Your access to the information for [insert state] has been denied. 
            If you have any questions, please reach out to your State Administrator.</p>
    
            <p>Thank you!</p>`
        },
        revoked: {
            subjectLine: "Your OneMAC Portal State access for [insert state] has been revoked",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>Your access to the information for [insert state] has been revoked. 
            If you have any questions, please reach out to your State Administrator.</p>
    
            <p>Thank you!</p>`
        }
    },
    stateadmin: {
        pending: {
            subjectLine: "Your OneMAC Role Access is Pending Review",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>We received your request as a [insert role requested] on [insert date/time stamp]. 
            Your request is pending review and you will receive a confirmation receipt when your status is reviewed.</p>
    
            <p>Thank you!</p>`
        },
        granted: {
            subjectLine: "Your OneMAC Portal State access for [insert state] has been granted!",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>You have been granted access as a State System Admin for [insert state]. 
            If you have any questions, please reach out to your CMS Role Approver.</p>
    
            <p>Thank you!</p>`
        },
        denied: {
            subjectLine: "Your OneMAC Portal State access for [insert state] has been denied",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>You have been denied access as a State System Admin for [insert state]. 
            If you have any questions, please reach out to your CMS Role Approver.</p>
    
            <p>Thank you!</p>`
        },
        revoked: {
            subjectLine: "Your OneMAC Portal State access for [insert state] has been revoked",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>Your access as a State System Admin for [insert state] has been revoked. 
            If you have any questions, please reach out to your CMS Role Approver.</p>
    
            <p>Thank you!</p>`
        }
    },
    cmsapprover: {
        pending: {
            subjectLine: "Your OneMAC Role Access is Pending Review",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>We received your request as a [insert role requested] on [insert date/time stamp]. 
            Your request is pending review and you will receive a confirmation receipt when your status is reviewed.</p>
    
            <p>Thank you!</p>`
        },
        granted: {
            subjectLine: "Your OneMAC Portal CMS access has been granted!",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>You have been granted access as a CMS Role Approver. 
            If you have any questions, please reach out to your CMS Administrator.</p>
    
            <p>Thank you!</p>`
        },
        denied: {
            subjectLine: "Your OneMAC Portal CMS access has been denied",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>You have been denied access as a CMS Role Approver. 
            If you have any questions, please reach out to your CMS Administrator.</p>
    
            <p>Thank you!</p>`
        },
        revoked: {
            subjectLine: "Your OneMAC Portal CMS access has been revoked",
            bodyHTML: `
            <p>Hello,</p>
    
            <p>Your access as a CMS Role Approver has been revoked. 
            If you have any questions, please reach out to your CMS Administrator.</p>
    
            <p>Thank you!</p>`
        }
    },
};