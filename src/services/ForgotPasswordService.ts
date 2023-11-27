import repositorie from '@/src/repositories/ForgotPasswordRepository';

export default class ForgotPasswordService {

    public async ForgotPassword(formData: FormData){
        return await repositorie.ForgotPassword(formData);
    }

}
