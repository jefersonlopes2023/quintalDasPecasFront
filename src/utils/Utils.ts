export default class Utils {

    static formDataToUrlEncoded(formData: FormData): string 
    {
        const urlSearchParams = new URLSearchParams();

        // Percorra todas as chaves no FormData e adicione os pares chave-valor ao URLSearchParams
        for (const [key, value] of formData.entries()) {
            urlSearchParams.append(key, value.toString());
        }

        // Retorne a string no formato application/x-www-form-urlencoded
        return urlSearchParams.toString();
    }

    static getEnviroment(): string
    {   
        const hostName: string = useRequestURL().origin;
        const hostProd: string = useRuntimeConfig().public.enviroment.prod.host;
        return hostProd === hostName ? 'production' : 'development';
    }

    static getEnviromentHost( route: string ): string
    {   
        if( this.getEnviroment() === 'development' ){
            return useRuntimeConfig().public.enviroment.dev.host + useRuntimeConfig().public.apiUrl + route;
        }
        return useRuntimeConfig().public.enviroment.prod.host  + useRuntimeConfig().public.apiUrl + route;
    }

    static getQueryString()
    {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
    }

    static getQueryParam(name: string, url: string): string | null {
        name = name.replace(/[[]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        const results = regex.exec(url);
      
        if (!results) return null;
        if (!results[2]) return "";
      
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    static formatCNPJ(cnpj: string) {
        // Remove todos os caracteres não numéricos do CNPJ
        cnpj = cnpj.replace(/\D/g, '');
      
        // Adicione a formatação padrão
        cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
      
        return cnpj;
    }

    static formatZipCode(zipcode: string) {
        // Remove todos os caracteres não numéricos do CNPJ
        zipcode = zipcode.replace(/\D/g, '');
      
        // Adicione a formatação padrão
        zipcode = zipcode.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3');
      
        return zipcode;
      }
      
      
}