import repositorie from '@/src/repositories/EntityRepositorie';

export default class EntityService {
    
    public async store(formEntity: FormData){
        return await repositorie.store(formEntity);
    }

    public async single(id: number){
        return await repositorie.single(id);
    }

    public async all(){
        return repositorie.all();
    }

    public async updateAddress(id: number, formEntity: FormData){
        return repositorie.updateAddress(id, formEntity);
    }

    public async updatePersonalData(id: number, formEntity: FormData){
        return repositorie.updatePersonalData(id, formEntity);
    }

    public async updateContact(id: number, formEntity: FormData){
        return repositorie.updateContact(id, formEntity);
    }

}
