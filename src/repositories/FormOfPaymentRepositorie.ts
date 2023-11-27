import CallApi from '@/src/http/CallApi';

export default class FormOfPaymentRepositorie {

  static async store(formData: FormData) {   
    CallApi.setEndPoint('formofpayment');
    return await CallApi.store(formData);
  }

  static async single(id: number) {
    CallApi.setEndPoint('formofpayment');
    return CallApi.find(id);
  }

  static async all() {
    CallApi.setEndPoint('formofpayment');
    return CallApi.all();
  }

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('formofpayment');
    return CallApi.update(id, formData);
  }

  static async destroy(id: number) {
    CallApi.setEndPoint('formofpayment');
    return CallApi.destroy(id);
  }

  static async enable(id: number, formData: FormData) {
    CallApi.setEndPoint('formofpayment/enable');
    return CallApi.update(id, formData);
  }
}
