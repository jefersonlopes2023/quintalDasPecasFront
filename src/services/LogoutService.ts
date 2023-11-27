import repositorie from '@/src/repositories/LogoutRepositorie';

export default class ChangePasswordService {

    public async logout(){
        return repositorie.logout();
    }

}
