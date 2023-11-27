import CallApi from '@/src/http/CallApi';

export default class ChangePasswordRepositorie {
    
  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('changepassword');
    return CallApi.update(id, formData);
  }

}
