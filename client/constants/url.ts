export const API = {
  auth: {
    login: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/login',
    register: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/register',
    checkAuth: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/access-token',
  },
  customers: process.env.NEXT_PUBLIC_DOMAIN + '/api/for-customers',
  categoryProduct: process.env.NEXT_PUBLIC_DOMAIN + '/api/category-product',
  productType: process.env.NEXT_PUBLIC_DOMAIN + '/api/product-type',
  news: process.env.NEXT_PUBLIC_DOMAIN + '/api/news',
  storeReviews: process.env.NEXT_PUBLIC_DOMAIN + '/api/store-reviews',
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
};
