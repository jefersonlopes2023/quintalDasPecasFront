import CallApi from '@/src/http/CallApi';

export default class ConfigColorRepositorie {

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('configcolor');
    return await CallApi.update(id, formData);
  }

  static async all() {
    CallApi.setEndPoint('configcolor');
    return CallApi.all();
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('configcolor');
    return CallApi.destroy(id);
  }

}
