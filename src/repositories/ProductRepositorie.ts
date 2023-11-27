import CallApi from '@/src/http/CallApi';

export default class ProductRepositorie {
  static async store(formData: FormData) {   
    CallApi.setEndPoint('products');
    return await CallApi.store(formData);
  }

  static async single(id: number) {
    CallApi.setEndPoint('products');
    return CallApi.find(id);
  }

  static async all() {
    CallApi.setEndPoint('products');
    return CallApi.all();
  }

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('products');
    return CallApi.update(id, formData);
  }

  static async upload(formData: FormData) {
    CallApi.setEndPoint('products/upload');
    return await CallApi.Upload(formData);
  }

  static async getProductsByEntityId(id: string){
    CallApi.setEndPoint('productsbyentity');
    return CallApi.getWhere(id);
  }

  static async importItems(formData: FormData) {   
    CallApi.setEndPoint('items/importlote');
    return await CallApi.store(formData);
  }

  static async importItem(formData: FormData) {   
    CallApi.setEndPoint('items/import');
    return await CallApi.store(formData);
  }

  static async importItemsIndex(formData: FormData) {   
    CallApi.setEndPoint('items/importloteindex');
    return await CallApi.store(formData);
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('product');
    return CallApi.destroy(id);
  }

  static async updateProduct(id: number, formData: FormData) {
    CallApi.setEndPoint('productenable');
    return CallApi.update(id, formData);
  }

  static async getAnalisys(id: string){
    CallApi.setEndPoint('items/analysis');
    return CallApi.getWhere(id);
  }
}
