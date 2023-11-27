import CallApi from '@/src/http/CallApi';

export default class PreditorCategoriesRepositories {
  static async getPreditorCategories(value: string) {
    CallApi.setEndPoint('predictor');
    const formData = new FormData();
    formData.append('name', value);
    return CallApi.getWhere(value);
  }
}
