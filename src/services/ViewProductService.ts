import repositorie from '@/src/repositories/ViewProductRepositorie';

export default class ViewProductService {

    public async getActiveProducts(){
        return repositorie.getActiveProducts();
    }

    public async getActiveProductsByToken(token: string){
        return repositorie.getActiveProductsByToken(token);
    }

    public async getActiveProductsByTitle(formData: FormData){
        return repositorie.getActiveProductsByTitle(formData);
    }

}

