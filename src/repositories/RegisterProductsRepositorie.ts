import CallApi from '@/src/http/CallApi';

export default class RegisterProductsRepositorie {

  static async getSearchByName(value: string) {
    CallApi.setEndPoint('teste');
    const formData = new FormData();
    formData.append('name', value);
    return CallApi.getWhere(value);
  }

  static async getItemsByItem(value: string) {
    CallApi.setEndPoint('items/review');
    return CallApi.getWhere(value);
  }

  static async importItem(formData: FormData) {
    CallApi.setEndPoint('items/import');
    return CallApi.store(formData);
  }

  static async getOptionsAttributes(formData: FormData) {
    CallApi.setEndPoint('items/getoptionsattributes');
    return CallApi.store(formData);
  }

  static async store(formData: FormData) {
    CallApi.setEndPoint('items/store');
    return CallApi.store(formData);
  }

  static async upload(formData: FormData) {
    CallApi.setEndPoint('items/store');
    return CallApi.Upload(formData);
  }

}
