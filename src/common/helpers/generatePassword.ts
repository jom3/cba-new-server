import generator from 'generate-password-ts';

export const generatePassword = () =>{

    const password = generator.generate({
        length: 10,
        numbers: true,
        uppercase:true,
        lowercase:true,
    });

    return password;
}