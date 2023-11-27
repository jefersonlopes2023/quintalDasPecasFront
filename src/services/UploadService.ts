import repositorie from '@/src/repositories/UploadRepositorie';

export default class UploadService {

    public async Upload(formRegister: FormData){
        return await repositorie.upload(formRegister);
    }

}
