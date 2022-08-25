import { Storage } from "aws-amplify";

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
          if (error.indexOf("No credentials") !== -1) {
            reject("SESSION_EXPIRED");
          } else {
            console.log("Error uploading.", error);
            reject("UPLOADS_ERROR");
          }
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
  const fileToUpload = ensureLowerCaseFileExtension(file);

  let retPromise;
  const targetPathname = `${Date.now()}/${fileToUpload.name}`;

  try {
    const stored = await Storage.put(targetPathname, fileToUpload, {
      level: "protected",
      contentType: fileToUpload.type,
      resumable: true,
      completeCallback: (event) => {
        console.log(`Successfully uploaded ${event.key}`);
      },
      progressCallback: (progress) => {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
      errorCallback: (err) => {
        console.error("Unexpected error while uploading", err);
      },
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
  } catch (error) {
    retPromise = Promise.reject(error);
  }
  return retPromise;
}
