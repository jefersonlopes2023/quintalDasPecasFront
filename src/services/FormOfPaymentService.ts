import repositorie from '@/src/repositories/FormOfPaymentRepositorie';

export default class RegisterProductsService {

    public async store(formData: FormData){
        return await repositorie.store(formData)
    }

    public async single(id: number){
        return await repositorie.single(id)
    }

    public async all(){
        return await repositorie.all()
    }

    public async update(id: number, formData: FormData){
        return await repositorie.update(id, formData)
    }

    public async destroy(id: number){
        return await repositorie.destroy(id)
    }

    public async enable(id: number, formData: FormData){
        return await repositorie.enable(id, formData);
    }
}
