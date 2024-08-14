//2024.08.14
//
export interface Category {
  category_id: number;
  category: string;
  sort: number;
}

//단일 제품 데이터 타입 정의
export interface Product {
  product_id: number;
  category_id: number;
  product_name: string;
  manufactuer: string;
  price: number;
  stock: number;
  image: string;
}
