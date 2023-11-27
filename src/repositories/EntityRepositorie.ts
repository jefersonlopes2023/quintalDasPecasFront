import CallApi from '@/src/http/CallApi';

export default class EntityRepositorie {
  static async store(formData: FormData) {
    CallApi.setEndPoint('entity');
    return await CallApi.store(formData);
  }

  static async single(id: number) {
    CallApi.setEndPoint('entity');
    return await CallApi.find(id);
  }

  static async all() {
    CallApi.setEndPoint('entity');
    return CallApi.all();
  }

  static async updateAddress(id: number, formData: FormData) {
    CallApi.setEndPoint('entity/address');
    return CallApi.update(id, formData);
  }
  static async updatePersonalData(id: number, formData: FormData) {
    CallApi.setEndPoint('entity/personaldata');
    return CallApi.update(id, formData);
  }

  static async updateContact(id: number, formData: FormData) {
    CallApi.setEndPoint('entity/contact');
    return CallApi.update(id, formData);
  }
}
