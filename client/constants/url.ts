export const API = {
  auth: {
    login: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/login',
    register: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/register',
    checkAuth: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/access-token',
  },
  userProfile: process.env.NEXT_PUBLIC_DOMAIN + '/api/users/profileUser',
  customers: process.env.NEXT_PUBLIC_DOMAIN + '/api/for-customers',
  categoryProduct: process.env.NEXT_PUBLIC_DOMAIN + '/api/category-product',
  productType: process.env.NEXT_PUBLIC_DOMAIN + '/api/product-type',
  news: process.env.NEXT_PUBLIC_DOMAIN + '/api/news',
  slider: process.env.NEXT_PUBLIC_DOMAIN + '/api/slider',
  products: {
    popular: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/popular',
    filterProduct: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/filter',
    search: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/search',
    allProducts: process.env.NEXT_PUBLIC_DOMAIN + '/api/product',
  },
  product: process.env.NEXT_PUBLIC_DOMAIN + '/api/product',
  poster: process.env.NEXT_PUBLIC_DOMAIN + '/api/poster-type',

  reviews: process.env.NEXT_PUBLIC_DOMAIN + '/api/reviews',
  storeReviews: process.env.NEXT_PUBLIC_DOMAIN + '/api/reviews/store-reviews',
  responseReview:
    process.env.NEXT_PUBLIC_DOMAIN + '/api/reviews/response-review',
  rating: process.env.NEXT_PUBLIC_DOMAIN + '/api/rating',
  favourites: process.env.NEXT_PUBLIC_DOMAIN + '/api/favourites',
  viewed: process.env.NEXT_PUBLIC_DOMAIN + '/api/viewed',
  personalData: process.env.NEXT_PUBLIC_DOMAIN + '/api/personal-data',
  address: process.env.NEXT_PUBLIC_DOMAIN + '/api/personal-data/address',
  phone: process.env.NEXT_PUBLIC_DOMAIN + '/api/personal-data/phone',
  email: process.env.NEXT_PUBLIC_DOMAIN + '/api/users/email',
  password: process.env.NEXT_PUBLIC_DOMAIN + '/api/users/password',
  cart: process.env.NEXT_PUBLIC_DOMAIN + '/api/cart',
  reduceQuantities: process.env.NEXT_PUBLIC_DOMAIN + '/api/cart/reduce',
  order: process.env.NEXT_PUBLIC_DOMAIN + '/api/order',
  admin: {
    users: process.env.NEXT_PUBLIC_DOMAIN + '/api/users',
    slider: process.env.NEXT_PUBLIC_DOMAIN + '/api/slider',
    files: process.env.NEXT_PUBLIC_DOMAIN + '/api/file',
    removeUrl: process.env.NEXT_PUBLIC_DOMAIN + '/api/file/remove',
    poster: process.env.NEXT_PUBLIC_DOMAIN + '/api/poster-type',
    searchPoster:
      process.env.NEXT_PUBLIC_DOMAIN + '/api/poster-type/searchPoster',
    searchCategory:
      process.env.NEXT_PUBLIC_DOMAIN + '/api/category-product/search',
    brand: process.env.NEXT_PUBLIC_DOMAIN + '/api/brand',
  },
};
