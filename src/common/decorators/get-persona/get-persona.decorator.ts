import { createParamDecorator, ExecutionContext, InternalServerErrorException} from '@nestjs/common';



export const GetPersona = createParamDecorator(
    
    (data,ctx:ExecutionContext)=>{
        
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        
        if(!user){
            throw new InternalServerErrorException('usuario no obtenido')
        }
        const {persona} = user;
        const {rol} = persona;
        return rol;
    }
);
