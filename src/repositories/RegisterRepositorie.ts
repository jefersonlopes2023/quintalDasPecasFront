import CallApi from '@/src/http/CallApi';

export default class RegisterRepositorie {
  static async store(formData: FormData, typeRegister: number) {
   
    if( typeRegister === 1){
      CallApi.setEndPoint('registerentity');
    }

    if( typeRegister === 2){
      CallApi.setEndPoint('registerentity');
    }    
    return await CallApi.store(formData);
  }

  static async single(id: number) {
    CallApi.setEndPoint('registerentity');
    return CallApi.find(id);
  }

  static async all() {
    CallApi.setEndPoint('registerentity');
    return CallApi.all();
  }

  static async update(id: number, formData: FormData) {
    CallApi.setEndPoint('registerentity');
    return CallApi.update(id, formData);
  }
}
