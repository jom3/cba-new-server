export const ArchivoFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    if ( !file ) return callback( new Error('Archivo vacio'), false );


    const fileExptension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','png','gif','pdf','excel','word'];

    if (  validExtensions.includes( fileExptension ) ) {
        return callback( null, true )
    }

    callback(null, false );

}