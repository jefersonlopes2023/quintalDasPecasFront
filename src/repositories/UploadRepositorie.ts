import CallApi from '@/src/http/CallApi';

export default class UploadRepositorie {

  static async upload(formData: FormData) {
    CallApi.setEndPoint('upload');
    return await CallApi.Upload(formData);
  }

}
