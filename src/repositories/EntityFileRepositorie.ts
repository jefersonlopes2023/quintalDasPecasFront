import CallApi from '@/src/http/CallApi';

export default class EntityRepositorie {  
  
  static async destroy(id: number) {
    CallApi.setEndPoint('entityfile');
    return CallApi.destroy(id);
  }

  static async getFileByEntityId(id: number){
    CallApi.setEndPoint('entityfile');
    return CallApi.find(id);
  }

  static async approve(id: number){
    CallApi.setEndPoint('entityfile/document/approve');
    const formData = new FormData();
    formData.append('approved', '1');
    return CallApi.update(id, formData);
  }

  static async reject(id: number){
    CallApi.setEndPoint('entityfile/document/reject');
    const formData = new FormData();
    formData.append('reject', '1');
    return CallApi.update(id, formData);
  }
}
