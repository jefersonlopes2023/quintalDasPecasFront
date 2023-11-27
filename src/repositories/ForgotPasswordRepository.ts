import CallApi from '@/src/http/CallApi';

export default class ForgotPasswordRepository {

  static async ForgotPassword(formData: FormData) {
    CallApi.setEndPoint('forgotpassword');
    return await CallApi.Upload(formData);
  }

}
