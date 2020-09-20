import { Storage } from "aws-amplify";

/**
 * Upload a list of files to an S3 bucket.
 * @param {Array.Object} fileArray a list of files to upload
 * @return {Promise} promise that returns an array of files uploaded
 */
export async function uploadFiles(fileArray) {
  let resultPromise;
  if (fileArray.length > 0) {
    // Process each file.
    let uploadPromises = [];
    fileArray.forEach((file) => {
      let promise = uploadFile(file);
      uploadPromises.push(promise);
    });

    //Wait until all files are uploaded.
    resultPromise = new Promise((resolve, reject) => {
      Promise.all(uploadPromises)
        .then((results) => {
          resolve(results);
        })
        .catch((error) => {
          reject("Error uploading.", error);
        });
    });
  } else {
    // Since we have no files then we are successful.
    Promise.resolve();
  }

  return resultPromise;
}
/**
 * Upload a file to the S3 bucket.
 * @param {Object} file file object from the form
 * @returns metadata of the uploaded object which includes s3 key, filename, content type and url
 */
export async function uploadFile(file) {
  let retPromise;
  const targetPathname = `${Date.now()}/${file.name}`;

  try {
    const stored = await Storage.vault.put(targetPathname, file, {
      contentType: file.type,
    });
    const url = await Storage.vault.get(stored.key);

    let result = {
      s3Key: stored.key,
      filename: file.name,
      contentType: file.type,
      url: url,
      title: file.title
    };
    retPromise = Promise.resolve(result);
  } catch (error) {
    console.log("ERROR while uploading file: ", file, error);
    retPromise = Promise.reject(error);
  }
  return retPromise;
}
