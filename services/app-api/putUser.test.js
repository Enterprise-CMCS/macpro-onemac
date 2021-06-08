import { constructRoleAdminEmails } from "./putUser";

const stateUser = {
    firstName: "John",
    lastName: "Doe",
    doneBy: "systemadmintest@cms.hhs.local",
    attributes: [
        {
            stateCode: "MI",
            status: "active"
        }
    ],
    id: "stateuserdenied@cms.hhs.local",
    type: "stateuser"
}

const stateAdmin = { 
    firstName: "John",
    lastName: "Doe",
    doneBy: "systemadmintest@cms.hhs.local",
    attributes: [
        {
            stateCode: "VA",   
            status: "active" 
        }
    ],
    id: "stateadminactiveVA2@cms.hhs.local", 
    type: "stateadmin" 
}

const cmsApprover = {
    firstName: "John",
    lastName: "Doe",
    doneBy: "systemadmintest@cms.hhs.local",
    attributes: [
        {
            status: "active"
        }
    ],
    id: "hasanfar@gmail.com",
    type: "cmsapprover"
}

it("Should show the full name in the email message for CMSApprover", async()=>{
    const result = constructRoleAdminEmails([],cmsApprover).email.HTML;
    expect(result).toContain('John Doe');
});

it("Should show the full name in the email message for State User", async()=>{
    const result = constructRoleAdminEmails([],stateUser).email.HTML;
    expect(result).toContain('John Doe');
});

it("Should show the full name in the email message for State Admin", async()=>{
    const result = constructRoleAdminEmails([],stateAdmin).email.HTML;
    expect(result).toContain('John Doe');
});