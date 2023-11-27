import utils from '@/src/utils/Utils';

interface Options{
    headers:{
        Accept:string,
        ContentType:string,
        mode:string,
        credentials:string
    },
    method:string,
    body:string
}

const option: Options = {
    headers: {
        Accept: 'application/json',
        ContentType: 'application/x-www-form-urlencoded',
        mode: 'cors',
        credentials: 'include'
    },
    method: '',
    body: ''
  };
  

export default class CallApi{

    static endPoint = '';

    static async sactum(){        
        const apiUrl = useRuntimeConfig().public.csrf;
        await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.headers = {
                    'mode' : option.headers.mode,
                    'credentials' : option.headers.credentials,
                    'Accept' : option.headers.Accept,
                   'Content-Type' : option.headers.ContentType
                };
                options.method = 'GET';
            }
        });
    }

    static async auth(myForm: FormData){        
        
        await this.sactum();

        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        option.body = utils.formDataToUrlEncoded(myForm);
       return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.headers = {
                    'mode' : option.headers.mode,
                    'credentials' : option.headers.credentials,
                    'Accept' : option.headers.Accept,
                   'Content-Type' : option.headers.ContentType
                };
                options.method = 'POST';
                options.body = option.body;
            },
            onRequestError({ request, options, error }) {
                //console.log(error);
            },
            onResponse({ request, response, options }) {
               //return response._data;
            },
            onResponseError({ request, response, options }) {
                //return response._data;               
            }
        });

    }

    static async store(myForm: FormData){
        
        const apiUrl = utils.getEnviromentHost(this.getEndPoint());  
        option.body = utils.formDataToUrlEncoded(myForm);
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.headers = {
                    'mode' : option.headers.mode,
                    'credentials' : option.headers.credentials,
                    'Accept' : option.headers.Accept,
                   'Content-Type' : option.headers.ContentType
                };
                options.method = 'POST';
                options.body = option.body;
            },
            onRequestError({ request, options, error }) {
                //console.log(error);
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
                return response._data;
            }
        });

    }

    static async find(id: Number){
        
        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.query = {'id' : id};
                options.method = 'GET';
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
                return response._data;
            }
        });

    }

    static async all(){
        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.method = 'GET';
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
                return response._data;
            }
        });
    }

    static async update(id: number, FormData: FormData){
        const apiUrl = utils.getEnviromentHost(this.getEndPoint()) + '/' + id;
        option.body = utils.formDataToUrlEncoded(FormData);
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.headers = {
                    'mode' : option.headers.mode,
                    'credentials' : option.headers.credentials,
                    'Accept' : option.headers.Accept,
                   'Content-Type' : option.headers.ContentType
                };
                options.method = 'PUT';
                options.body = option.body;
            },
            onRequestError({ request, options, error }) {
                // console.log(error);
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
                return response._data;
            }
        });
    }

    static async destroy(id: number){
        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.query = {'id' : id};
                options.method = 'DELETE';
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
                return response._data;
            }
        });
    }

     // Método getter para obter o endPoint atual
    static getEndPoint() {
        return this.endPoint;
    }

    // Método setter para definir o novo endPoint
    static setEndPoint(newEndPoint: string) {
        this.endPoint = newEndPoint;
    }

    static async Upload(myForm: FormData){

        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.headers = {
                    'mode' : option.headers.mode,
                    'credentials' : option.headers.credentials,
                    'Accept' : option.headers.Accept
                };
                options.method = 'POST';
                options.body = myForm;
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
                return response._data;
            }
        });

    }

    static async resetPassword(token: string, FormData: FormData){
        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        option.body = utils.formDataToUrlEncoded(FormData);
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.headers = {
                    'mode' : option.headers.mode,
                    'credentials' : option.headers.credentials,
                    'Accept' : option.headers.Accept,
                   'Content-Type' : option.headers.ContentType
                };
                options.method = 'POST';
                options.body = option.body;
            },
            onRequestError({ request, options, error }) {
                // console.log(error);
            },
            onResponse({ request, response, options }) {
                //return response._data;
            },
            onResponseError({ request, response, options }) {
                //return response._data;
            }
        });
    }

    static async logout(){
        
        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.method = 'GET';
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
                return response._data;
            }
        });

    }

    static async getWhere(value: string){
        const apiUrl = utils.getEnviromentHost(this.getEndPoint());
        return await useFetch( apiUrl, {
            onRequest({ request, options }) {
                options.query = {'name' : value};
                options.method = 'GET';
            },
            onResponse({ request, response, options }) {
                return response._data;
            },
            onResponseError({ request, response, options }) {
               return response._data;
            }
        });
    }
}