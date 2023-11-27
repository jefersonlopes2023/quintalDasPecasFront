import repositorie from '@/src/repositories/ProductRepositorie';

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

    public async update(id: number, formEntity: FormData){
        return repositorie.update(id, formEntity);
    }
    
    public async Upload(formRegister: FormData){
        return await repositorie.upload(formRegister);
    }

    public async getProductsByEntityId(id: string){
        return repositorie.getProductsByEntityId(id)
    }

    public async importItems(formEntity: FormData){
        return await repositorie.importItems(formEntity); 
    }

    public async importItem(formEntity: FormData){
        return await repositorie.importItem(formEntity); 
    }

    public async importItemsIndex(formEntity: FormData){
        return await repositorie.importItemsIndex(formEntity); 
    }

    public async destroy(id: number){
        return await repositorie.destroy(id);
    }

    public async updateProduct(id: number, formEntity: FormData){
        return repositorie.updateProduct(id, formEntity);
    }

    public async getAnalisys(id: string){
        return repositorie.getAnalisys(id)
    }
}
