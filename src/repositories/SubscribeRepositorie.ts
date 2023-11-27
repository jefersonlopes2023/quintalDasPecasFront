import CallApi from '@/src/http/CallApi';

export default class SubscribeRepositorie {

  static async store(formData: FormData) {   
    CallApi.setEndPoint('subscribe');
    return await CallApi.store(formData);
  }

  static async single(id: number) {
    CallApi.setEndPoint('subscribe');
    return CallApi.find(id);
  }

  static async all() {
    CallApi.setEndPoint('subscribe');
    return CallApi.all();
  }

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('subscribe');
    return CallApi.update(id, formData);
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('subscribe');
    return CallApi.destroy(id);
  }
  
  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('subscribe/enable');
    return CallApi.update(id, formData);
  }
}
