import express, { Request, Response } from 'express'
import { constants } from 'http2'
import { body } from 'express-validator'


import { requireAuth, validateRequest } from '../../common'
import { getFilesByUserId, getFileUrlByUserId } from '../../services/files/index'
// create the express router
const router = express.Router()



/**
 * @openapi
     *  Ottieni il link per scaricare un file relativo ad un utente
     * Method: GET
     * Path: /api/files/url/:userId/:fileName
     * Params:
     * - userId: id univoco dell'utente 
     * - fileName: nome file da recuperare
 */
// router.put(
//     '/v1/files/:userId/:fileName',
//     [
//         body('file').trim().not().isEmpty().withMessage('The file is required'),

//     ],
//     validateRequest,
//     requireAuth,
//     async (req: Request, res: Response) => {

//         let s3 = new AWS.S3();
//         // const path = 'tests.json';
//         const path = req.params.userId + '/';
//         const key = path + req.params.fileName;
//         const type = req.query.type;
//         const body = Buffer.from(req.body.file, 'base64');
//         // const base64Response = await fetch(req.body.file);
//         // const blob = await req.body.file.blob();

//         let putparams : AWS.S3.PutObjectRequest = {
//             Bucket: AWS_S3_BUCKET,
//             Key: key,
//             Body: req.body.file,
//             ContentType: req.body.type
//         };

//         console.log('params:',putparams);

//         // Put object into S3
//         s3.upload(putparams, (error, data) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(500).send(error);
//             }
//             console.log(data);
//             res.status(200).send({key: key});
//         });
//     }
// )

/**
 * @openapi
    /**  Ottieni la lista files relativa ad un utente
     * Method: GET
     * Path: /api/files/:userId
     * Params:
     * @param userId: id univoco dell'utente 
     * La lista dei files dell utente identificato dall'id
    */
router.get('/v1/files/:userId', requireAuth, async (req: Request, res: Response) => {
    console.log("GET /api/files");



    let dir = req.params.userId + '/';
    
    const files = await getFilesByUserId(dir);
    res.send(files);


})

/**
 * @openapi
    /**  Ottieni un link per il download/upload di un file
     * Method: GET
     * Path: /v1/files/url/:userId
     * Params:
     * @param userId: id univoco dell'utente 
     * La lista dei files dell utente identificato dall'id
    */
     router.get('/v1/files/url/:userId', requireAuth, async (req: Request, res: Response) => {
       
        console.log("GET /api/files/url");
        console.log("params: ", req.params);
        

        const path:string = req.params.userId + '/' +req.params.fileName;
        const mode:string = req.query.mode ? String (req.query.mode) : '';

        const resp = await getFileUrlByUserId(path, mode);
        if(resp.url)
            res.send(resp.url);
        else
            res.status(500).send(resp);

    })


export { router as filesRouter }
