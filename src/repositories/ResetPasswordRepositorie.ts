import CallApi from '@/src/http/CallApi';

export default class ChangePasswordRepositorie {
    
  static async resetPassword(token: string, formData: FormData) {
    CallApi.setEndPoint('resetpassword');
    return CallApi.resetPassword(token, formData);
  }

}
