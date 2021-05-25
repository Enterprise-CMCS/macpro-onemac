// import "promise-polyfill/src/polyfill";
//import "core-js/es/typed-array/uint32-array";
//import "core-js/es/array/find";
//import "core-js/es/object/assign";
//import "core-js/es/object/entries";
//import "core-js/es/array";
//import "core-js/es/object";
//import "isomorphic-fetch";
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
      level: "protected",
      contentType: file.type,
    });

    const url = await Storage.vault.get(stored.key, { level: "protected" });

    let result = {
      s3Key: stored.key,
      filename: file.name,
      contentType: file.type,
      url: url.split("?", 1)[0], //We only need the permalink part of the URL since the S3 bucket policy allows for public read
      title: file.title,
    };

    // If the upload to S3 fails (handled in AWS Amplify Storage) a message gets added to the console, but the
    // promise comes back resolved, AND the get call will work as well.
    // HOWEVER, if you try to access the url sent back, you receive an error message
    // so can check for that.
    await fetch(result.url, {
      method: "HEAD",
    }).then((response) => {
      if (response.status !== 200) {
        retPromise = Promise.reject(
          "File verification failed"
        );
      } else {
        retPromise = Promise.resolve(result);
      }
    });
  } catch (error) {
    retPromise = Promise.reject(error);
  }
  return retPromise;
}
