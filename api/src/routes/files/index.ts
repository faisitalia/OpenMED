import express, { Request, Response } from 'express'
import { constants } from 'http2'
import { body } from 'express-validator'
import AWS from 'aws-sdk'

import { requireAuth, validateRequest } from '../../common'

import { VisitDoc } from '../../models/visit'

// create the express router
const router = express.Router()

const AWS_S3_BUCKET = String(process.env.AWS_S3_BUCKET);
let AWS_ACCESS_KEY_ID : string;

AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        if(AWS.config && AWS.config.credentials && AWS.config.credentials.accessKeyId)
            AWS_ACCESS_KEY_ID = AWS.config.credentials.accessKeyId
            
      console.log("Access key:", AWS_ACCESS_KEY_ID);
    }
});

/**
 * @openapi
     *  Ottieni il link per scaricare un file relativo ad un utente
     * Method: GET
     * Path: /api/files/url/:userId/:fileName
     * Params:
     * - userId: id univoco dell'utente 
     * - fileName: nome file da recuperare
 */
router.put(
    '/v1/files/:userId/:fileName',
    [
        body('file').trim().not().isEmpty().withMessage('The file is required'),

    ],
    validateRequest,
    requireAuth,
    async (req: Request, res: Response) => {

        let s3 = new AWS.S3();
        // const path = 'tests.json';
        const path = req.params.userId + '/';
        const key = path + req.params.fileName;
        const type = req.query.type;
        const body = Buffer.from(req.body.file, 'base64');
        // const base64Response = await fetch(req.body.file);
        // const blob = await req.body.file.blob();

        let putparams : AWS.S3.PutObjectRequest = {
            Bucket: AWS_S3_BUCKET,
            Key: key,
            Body: req.body.file,
            ContentType: req.body.type
        };

        console.log('params:',putparams);

        // Put object into S3
        s3.upload(putparams, (error, data) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }
            console.log(data);
            res.status(200).send({key: key});
        });
    }
)

/**
 * @openapi
    /**  Ottieni la lista files relativa ad un utente
     * Method: GET
     * Path: /api/files/:userId
     * Params:
     * - userId: id univoco dell'utente 
     * La lista dei files dell utente identificato dall'id
    */
router.get('/v1/files/:userId', requireAuth, async (req: Request, res: Response) => {
    console.log("GET /api/files");

    const s3 = new AWS.S3();

    let dir = req.params.userId + '/';
    //let dir = '';

    console.log('dir: ', dir);

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
            res.status(500).send({ err: 'empty folder' });
        else
            res.send(listedObjects.Contents);
    } catch (e) {
        res.status(500).send(e);
    }

})

/**
 * @openapi
    /**  Ottieni la lista files relativa ad un utente
     * Method: GET
     * Path: /api/files/:userId
     * Params:
     * - userId: id univoco dell'utente 
     * La lista dei files dell utente identificato dall'id
    */
     router.get('/v1/files/:userId', requireAuth, async (req: Request, res: Response) => {
       
        console.log("GET /api/files/url");
        console.log("params: ", req.params);
        
        let s3 = new AWS.S3({
            endpoint: 's3-eu-central-1.amazonaws.com',
            signatureVersion: 'v4',
            region: 'eu-central-1'
        });
        const path:string = req.params.userId + '/' +req.params.fileName;
        const mode:string = req.query.mode ? String (req.query.mode) : '';

        console.log("mode: ", mode);
        console.log("path: ", path);

        const signedUrlExpireSeconds = 60 * 25;

        try {
            ///GET
            const url = s3.getSignedUrl(mode, {
                Bucket: AWS_S3_BUCKET,
                Key: path,
                // 'Content-Type': 'application/pdf',
                Expires: signedUrlExpireSeconds
            });

            console.log('Object Url:' , url);
            res.status(200).send({url: url});

        } catch (e) {
            console.log('ERROR: '+e);
            res.status(500).send(e);;
        }
    })


export { router as filesRouter }
