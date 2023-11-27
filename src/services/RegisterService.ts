import repositorie from '@/src/repositories/RegisterRepositorie';

interface FormRegister {
    name : string;
    email : string;
    password : string;
    password_confirmation : string;
};

const formRegister: FormRegister = {
    'name' : '',
    'email' : '',
    'password' : '',
    'password_confirmation' : '',
};

export default class RegisterService {
    
    public async store(formRegister: FormData, typeRegister: number){
        return await repositorie.store(formRegister, typeRegister);
    }

    public async single(id: number){
        return repositorie.single(id);
    }

    public async all(){
        return repositorie.all();
    }

    public async update(id: number, formRegister: FormRegister){

        const formData = new FormData();
        formData.append('name' , formRegister.name);
        formData.append('email' , formRegister.email);
        formData.append('password' , formRegister.password);
        formData.append('password_confirmation' , formRegister.password_confirmation);

        return repositorie.update(id, formData);
    }

}
