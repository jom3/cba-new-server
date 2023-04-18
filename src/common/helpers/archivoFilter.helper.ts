export const ArchivoFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    if ( !file ) return callback( new Error('Archivo vacio'), false );


    const fileExptension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','pdf','doc','docx','docm','xlsx','xlsm','xlsb','xltx'];

    if (  validExtensions.includes( fileExptension ) ) {
        return callback( null, true )
    }

    callback(null, false );

}