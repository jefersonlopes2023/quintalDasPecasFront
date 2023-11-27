import repositorie from '@/src/repositories/ConfigColorRepositorie';

export default class ConfigColorService {

    public async update(id: number, formData: FormData){
        return await repositorie.update(id, formData);
    }

    public async all(){
        return await repositorie.all();
    }

    public async destroy(id: number){
        return await repositorie.destroy(id);
    }
}
