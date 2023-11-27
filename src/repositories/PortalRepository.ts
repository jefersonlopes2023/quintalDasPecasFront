import CallApi from '@/src/http/CallApi';

export default class PortalRepositorie {
    static async store(formData: FormData) {
      CallApi.setEndPoint('portal');
      return await CallApi.store(formData);
    }
  
    static async all() {
      CallApi.setEndPoint('portal');
      return CallApi.all();
    }
  
    static async update(id: number, formData: FormData) {
      CallApi.setEndPoint('portal');
      return CallApi.update(id, formData);
    }
}