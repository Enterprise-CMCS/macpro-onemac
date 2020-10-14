import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import { onError } from "../libs/errorLib";

/**
 * Submit a change request to be saved by the backend.
 * @param {Object} data the change request data
 * @param {Array} uploadedList an array with the information on the already uploaded files
 */
export default async function submitChangeRequest(data, uploadedList) {
    if(!data || !uploadedList || !data.type || uploadedList.length === 0) {
        console.log('Unable to submit data due to missing fields or uploads.', data, uploadedList);
        throw new Error('Missing required data or uploads');
    }
    try {
        data.user = await Auth.currentUserInfo();
        data.uploads = uploadedList;
  
        return await API.post('changeRequestAPI', '/submit', {
          body: data,
        });
      } catch (error) {
        onError('There was an error submitting your request.  Please try again.');
        console.log('Error while submitting the form.', error);
        throw error;
      }
}
