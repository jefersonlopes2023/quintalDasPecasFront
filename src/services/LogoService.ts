import repositorie from '@/src/repositories/LogoRepositorie';

export default class LogoService {

    public async Upload(formRegister: FormData){
        return await repositorie.upload(formRegister);
    }

    public async getLogo(){
        return await repositorie.getLogo();
    }

    public async destroy(id: number){
        return await repositorie.destroy(id);
    }

    public async enable(id: number, formData: FormData){
        return await repositorie.enable(id, formData);
    }

    public async getAllActive(){
        return await repositorie.getAllActive();
    }
}
