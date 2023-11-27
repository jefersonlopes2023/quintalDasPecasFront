import CallApi from '@/src/http/CallApi';

export default class UserRepositorie {

  static async getUsersEntity(){
    CallApi.setEndPoint('users/entity');
    return await CallApi.all();
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('users/destroy');
    return CallApi.destroy(id);
  }

  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('users/enable');
    return CallApi.update(id, formData);
  }

  static async getAllActive(id: string) {
    CallApi.setEndPoint('users/entity');
    return CallApi.getWhere(id);
  }

  static async getAll() {
    CallApi.setEndPoint('users');
    return CallApi.all();
  }

  static async sendMail(formData: FormData) {
    CallApi.setEndPoint('users/sendmail');
    return CallApi.store(formData);
  }

  static async store(formData: FormData) {
    CallApi.setEndPoint('users');
    return CallApi.store(formData);
  }

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('users/update');
    return CallApi.update(id, formData);
  }

}
