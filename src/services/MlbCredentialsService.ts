import repositorie from '@/src/repositories/MlbCredentialsRepositories';

export default class MlbCredentialsService {
    
    public async store(formEntity: FormData){
        return await repositorie.store(formEntity);
    }

    public async update(id: number, formAuth: FormData){
        return repositorie.update(id, formAuth);
    }

    public async destroy(id: number){
        return await repositorie.destroy(id);
    }

    public async getCredentialsMlByEntityId(id: string){
        return await repositorie.getCredentialsMlByEntityId(id);
    }

    public async enable(id: number, formData: FormData){
        return await repositorie.enable(id, formData);
    }
}
