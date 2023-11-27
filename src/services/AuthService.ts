import repositorie from '@/src/repositories/AuthRepositorie';

export default class AuhtService {
    
    public async auth(formAuth: FormData){
        return await repositorie.auth(formAuth);
    }

    public async store(formAuth: FormData){
        return await repositorie.store(formAuth);
    }

    public async single(id: number){
        return repositorie.single(id);
    }

    public async all(){
        return repositorie.all();
    }

    public async update(id: number, formAuth: FormData){
        return repositorie.update(id, formAuth);
    }

}
