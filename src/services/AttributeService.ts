import repositorie from '@/src/repositories/AttributeRepositories';

export default class AttributeService {

    public async getAttributeByCategoryId(value: string){
        
        return await repositorie.getAttributeByCategoryId(value);
    }
}
