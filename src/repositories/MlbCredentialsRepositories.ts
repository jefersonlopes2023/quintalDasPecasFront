import CallApi from '@/src/http/CallApi';

export default class MlbCredentialsRepositorie {

  static async store(formData: FormData) {
    CallApi.setEndPoint('credentials');
    return await CallApi.store(formData);    
  }
  
  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('credentials');
    return CallApi.update(id, formData);
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('credentials');
    return CallApi.destroy(id);
  }

  static async getCredentialsMlByEntityId(id: string) {
    CallApi.setEndPoint('credentials');
    return CallApi.getWhere(id);
  }

  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('enable/credentials');
    return CallApi.update(id, formData);
  }
}
