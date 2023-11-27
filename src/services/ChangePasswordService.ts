import repositorie from '@/src/repositories/ChangePasswordRepositorie';

export default class ChangePasswordService {

    public async update(id: number, formEntity: FormData){
        return repositorie.update(id, formEntity);
    }

}
