import CallApi from '@/src/http/CallApi';

export default class AuthRepositorie{

     static async auth(formData: FormData){
          CallApi.setEndPoint('login');
          return await CallApi.auth(formData);
     }

     static async store(formData: FormData){
          CallApi.setEndPoint('forgot-password');
          return await CallApi.store(formData);
     }

     static async single(id: number){
          return CallApi.find(id);
     }

     static async all(){
          return CallApi.all();
     }

     static async update(id: number, formData: FormData){
          return CallApi.update(id, formData);
     }

}
