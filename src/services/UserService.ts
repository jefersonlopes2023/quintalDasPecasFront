import repositorie from '@/src/repositories/UserRepositorie';

export default class UserService {

    public async getUsersEntity(){
        return await repositorie.getUsersEntity();
    }

    public async destroy(id: number){
        return await repositorie.destroy(id);
    }

    public async enable(id: number, formData: FormData){
        return await repositorie.enable(id, formData);
    }

    public async getAll(){
        return await repositorie.getAll();
    }

    public async getAllActive(id: string){
        return await repositorie.getAllActive(id);
    }

    public async sendMail(id: string){
        const form = new FormData();
        form.append('id', id);
        return await repositorie.sendMail(form);
    }

    public async store(formData: FormData){
        return await repositorie.store(formData);
    }

    public async update(id: number, formData: FormData){
        return await repositorie.update(id, formData);
    }
}
