import Api from "../axios/Api";
export const CAROUSEL_API="/carousels"

export const fetchCarousel=async()=> {
return await Api.get(CAROUSEL_API);
}
export const fetchCarouselById=async(carouselId)=> {
return await Api.get(CAROUSEL_API + '/' + carouselId);
}
export const deleteCarousel=async(carouselId) =>{
return await Api.delete(CAROUSEL_API + '/' + carouselId);
}
export const addCarousel=async(carousel)=> {
return await Api.post(CAROUSEL_API,carousel);
}
export const editCarousel=(carousel) =>{
return Api.put(CAROUSEL_API + '/' + carousel._id, carousel);
}
