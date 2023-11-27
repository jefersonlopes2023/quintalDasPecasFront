import repositorie from '@/src/repositories/PreditorCategoriesRepositories';

export default class GetPreditorCategoriesService {

    public async getPreditorCategories(value: string){        
        return await repositorie.getPreditorCategories(value);
    }
}
