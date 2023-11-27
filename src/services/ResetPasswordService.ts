import repositorie from '@/src/repositories/ResetPasswordRepositorie';

export default class ChangePasswordService {

    public async resetPassword(token: string, formEntity: FormData){
        return repositorie.resetPassword(token, formEntity);
    }

}
