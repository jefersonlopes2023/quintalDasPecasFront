import CallApi from '@/src/http/CallApi';

export default class LougoutRepositorie {
    
  static async logout() {
    CallApi.setEndPoint('logout');
    return CallApi.logout();
  }

}
