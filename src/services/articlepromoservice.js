import Api from "../axios/Api";
const ARTICLEPROMO_API="/articlespromo"
export const fetchArticlesPromo=async()=> {
return await Api.get(ARTICLEPROMO_API);
}
export const fetchArticlePromoById=async(articlepromoId)=> {
return await Api.get(ARTICLEPROMO_API + '/' + articlepromoId);
}

export const deleteArticlePromo=async(articlepromoId) =>{
return await Api.delete(ARTICLEPROMO_API + '/' + articlepromoId);
}

export const addArticlePromo=async(articlepromo)=> {
return await Api.post(ARTICLEPROMO_API, articlepromo);
}
export const editArticlePromo=(articlepromo) =>{
return Api.put(ARTICLEPROMO_API + '/' + articlepromo._id, articlepromo);
}
