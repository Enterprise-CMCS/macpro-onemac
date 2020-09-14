import { Storage } from "aws-amplify";

/**
 * Upload a file to the S3 bucket.
 * @param {Object} file file object from the form
 * @returns metadata of the uploaded object which includes s3 key, filename, content type and url
 */
export async function uploadFile(file) {
    const targetPathname = `${Date.now()}/${file.name}`;

    const stored = await Storage.vault.put(targetPathname, file, {
        contentType: file.type,
    });
    const url = await Storage.vault.get(stored.key);

    let result = {
        s3Key: stored.key,
        filename: file.name,
        contentType: file.type,
        url: url
    };

    console.log(result);
    return result;
}