import CallApi from '@/src/http/CallApi';

export default class logoRepositorie {

  static async upload(formData: FormData) {
    CallApi.setEndPoint('logo');
    return await CallApi.Upload(formData);
  }

  static async getLogo(){
    CallApi.setEndPoint('logo');
    return await CallApi.all();
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('logo');
    return CallApi.destroy(id);
  }

  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('enable/logo');
    return CallApi.update(id, formData);
  }

  static async getAllActive() {
    CallApi.setEndPoint('logo/active');
    return CallApi.all();
  }

}
