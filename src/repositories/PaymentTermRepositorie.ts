import CallApi from '@/src/http/CallApi';

export default class PaymentTermRepositorie {

  static async store(formData: FormData) {   
    CallApi.setEndPoint('paymentterm');
    return await CallApi.store(formData);
  }

  static async single(id: number) {
    CallApi.setEndPoint('paymentterm');
    return CallApi.find(id);
  }

  static async all() {
    CallApi.setEndPoint('paymentterm');
    return CallApi.all();
  }

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('paymentterm');
    return CallApi.update(id, formData);
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('paymentterm');
    return CallApi.destroy(id);
  }
  
  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('paymentterm/enable');
    return CallApi.update(id, formData);
  }
}
