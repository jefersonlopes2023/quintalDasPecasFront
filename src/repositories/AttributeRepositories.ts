import CallApi from '@/src/http/CallApi';

export default class AttributeRepositories {
    
  static async getAttributeByCategoryId(value: string){
    CallApi.setEndPoint('categories/attributes');
    const formData = new FormData();
    formData.append('name', value);
    return CallApi.getWhere(value);
  }
}
