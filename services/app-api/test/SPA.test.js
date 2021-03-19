import {expect} from 'chai';
import SPA from "../changeRequest/SPA";
import sinon from 'sinon';



describe('when using the SPA class', () => {
    const sandbox = sinon.createSandbox(); //Container for the SPA class object
    const testData = {
        transmittalNumber: "YY-21-1234-5678",
        territory: "VA",
        user: {
            email: 'some_user@example.com',
            firstName: "Some",
            lastName: "User"
        },
    }

    it('should be callable', () => {

    });

    it('should be callable', () => {

    });

});