import CallApi from '@/src/http/CallApi';

export default class SubscriptionPlanRepositorie {

  static async store(formData: FormData) {   
    CallApi.setEndPoint('subscriptionplan');
    return await CallApi.store(formData);
  }

  static async single(id: number) {
    CallApi.setEndPoint('subscriptionplan');
    return CallApi.find(id);
  }

  static async all() {
    CallApi.setEndPoint('subscriptionplan');
    return CallApi.all();
  }

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('subscriptionplan');
    return CallApi.update(id, formData);
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('subscriptionplan');
    return CallApi.destroy(id);
  }
  
  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('subscriptionplan/enable');
    return CallApi.update(id, formData);
  }

  static async getAllActive() {
    CallApi.setEndPoint('subscriptionplan/getallactive');
    return CallApi.all();
  }
}
