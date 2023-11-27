import repositorie from '@/src/repositories/PortalRepository';

export default class EntityService {
    
    public async store(formEntity: FormData){
        return await repositorie.store(formEntity);
    }

    public async all(){
        return repositorie.all();
    }

    public async update(id: number, formEntity: FormData){
        return repositorie.update(id, formEntity);
    }
}
