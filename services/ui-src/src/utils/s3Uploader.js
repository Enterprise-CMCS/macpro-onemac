import { Storage } from "aws-amplify";

import { RESPONSE_CODE } from "cmscommonlib";

/**
 * Checks if file extension is lowercase and if not converts it to lowercase.
 * @param {File} file a file
 * @return {File} original file if extension is lowercase or a copy of the file with a lowercased file extension
 */
export function ensureLowerCaseFileExtension(file) {
  const extensionStartIndex = file.name.lastIndexOf(".");
  const fileNameText = file.name.slice(0, extensionStartIndex);
  const fileNameExtension = file.name.substring(extensionStartIndex);
  const lowerCaseFileNameExtension = fileNameExtension.toLowerCase();

  if (fileNameExtension === lowerCaseFileNameExtension) {
    return file;
  } else {
    const updatedFileName = fileNameText.concat(lowerCaseFileNameExtension);
    const updatedFile = new File([file], updatedFileName, { type: file.type });
    updatedFile.title = file.title;
    return updatedFile;
  }
}

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
    fileArray.forEach((file, i) => {
      // let promise = setTimeout(uploadFile(file), i*10);
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
          if (error.message.indexOf("No credentials") !== -1) {
            reject(RESPONSE_CODE.SESSION_EXPIRED);
          } else {
            reject(RESPONSE_CODE.UPLOADS_ERROR);
          }
        });
    });
  } else {
    // Since we have no files then we are successful.
    Promise.resolve();
  }
  // console.log("ResultPromise: ", resultPromise);
  return resultPromise;
}

/**
 * Upload a file to the S3 bucket.
 * @param {Object} file file object from the form
 * @returns metadata of the uploaded object which includes s3 key, filename, content type and url
 */
export async function uploadFile(file) {
  const fileToUpload = ensureLowerCaseFileExtension(file);

  let retPromise;
  let numTries = 1;
  // const targetPathname = `${Date.now()}/${fileToUpload.name}`;
  const targetPathname = `123456789/${fileToUpload.name}`;

  while (numTries > 0 && numTries < 10) {
    try {
      const stored = await Storage.put(targetPathname, fileToUpload, {
        level: "protected",
        contentType: fileToUpload.type,
      });

      const url = await Storage.get(stored.key, { level: "protected" });

      let result = {
        s3Key: stored.key,
        filename: fileToUpload.name,
        contentType: fileToUpload.type,
        url: url.split("?", 1)[0], //We only need the permalink part of the URL since the S3 bucket policy allows for public read
        title: fileToUpload.title,
      };

      retPromise = Promise.resolve(result);
      numTries = 0;
    } catch (error) {
      numTries++;
      retPromise = Promise.reject(error);
      if (error.message.indexOf("failed with status code 503") !== -1) {
        console.log("got 503, numTries: ", numTries);
      } else {
        console.log("got a different error: ", error);
      }
    }
  }

  return retPromise;
}
