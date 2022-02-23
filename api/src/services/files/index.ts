import AWS from 'aws-sdk'

const AWS_S3_BUCKET = String(process.env.AWS_S3_BUCKET);
let AWS_ACCESS_KEY_ID : string;

AWS.config.getCredentials(function (err: any) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        if(AWS.config && AWS.config.credentials && AWS.config.credentials.accessKeyId)
            AWS_ACCESS_KEY_ID = AWS.config.credentials.accessKeyId
            
      console.log("Access key:", AWS_ACCESS_KEY_ID);
    }
});

/**
 *
 * @param dir
 * @returns
 */
async function getFilesByUserId(
  dir: string
) {

  let files: any[] = [];
  console.log('dir: ', dir);

  const s3 = new AWS.S3();
  const listParams:  AWS.S3.ListObjectsV2Request = {
      Bucket: AWS_S3_BUCKET,
      Prefix: dir,
      Delimiter: '/'
  };

  console.log('listParams: ', listParams);

  try {
      const listedObjects = await s3.listObjectsV2(listParams).promise();
      console.log('listedObjects:', listedObjects);
      if (!listedObjects.Contents || listedObjects.Contents.length === 0)
          new Error('empty folder');
      else
        files = listedObjects.Contents;
  } catch (e) {
      new Error(String(e));
  }

  return files;
}

/**
 *
 * @param dir
 * @returns
 */
 async function getFileUrlByUserId(
  path: string,
  mode: string
) {

  let url: string;

  console.log("mode: ", mode);
  console.log("path: ", path);

  let s3 = new AWS.S3({
    endpoint: 's3-eu-central-1.amazonaws.com',
    signatureVersion: 'v4',
    region: 'eu-central-1'
  });

  const signedUrlExpireSeconds = 60 * 25;

  try {
      ///GET
      url = s3.getSignedUrl(mode, {
          Bucket: AWS_S3_BUCKET,
          Key: path,
          // 'Content-Type': 'application/pdf',
          Expires: signedUrlExpireSeconds
      });

      console.log('Object Url:' , url);
      return {url: url};
      

  } catch (e) {
      console.log('ERROR: '+e);
      return {url: null, error: e};
      
  }

  
}

export { getFilesByUserId, getFileUrlByUserId }
