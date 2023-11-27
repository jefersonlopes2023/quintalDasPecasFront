import CallApi from '@/src/http/CallApi';

export default class BannerRepositorie {

  static async upload(formData: FormData) {
    CallApi.setEndPoint('banner');
    return await CallApi.Upload(formData);
  }

  static async getBanner(){
    CallApi.setEndPoint('banner');
    return await CallApi.all();
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('banner');
    return CallApi.destroy(id);
  }

  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('banner');
    return CallApi.update(id, formData);
  }

  static async getAllActive() {
    CallApi.setEndPoint('active/banner');
    return CallApi.all();
  }

}
