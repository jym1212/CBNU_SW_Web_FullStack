//2024.08.14
//제품 목록 페이지

import { useState, useEffect } from 'react';
import { Category, Product } from '@/interfaces/products';

const productData: Product[] = [
  {
    product_id: 1,
    category_id: 1,
    product_name: '삼성 노트북 2024 갤럭시북4 NT750XGR-A51A',
    manufactuer: '삼성전자',
    price: 939000,
    stock: 10,
    image: '/images/produncts/1',
  },
  {
    product_id: 2,
    category_id: 1,
    product_name: 'LG 노트북 그램',
    manufactuer: 'LG전자',
    price: 1539000,
    stock: 20,
    image: '/images/produncts/2',
  },
  {
    product_id: 3,
    category_id: 2,
    product_name: 'LG 775인치 UHD TV 75UPP7750PVA',
    manufactuer: 'LG전자',
    price: 2990000,
    stock: 30,
    image: '/images/produncts/3',
  },
  {
    product_id: 4,
    category_id: 3,
    product_name: '삼성 냉장고 2023 XDFDFD07184',
    manufactuer: '삼성전자',
    price: 5090000,
    stock: 40,
    image: '/images/produncts/4',
  },
  {
    product_id: 5,
    category_id: 3,
    product_name: '삼성 냉장고 2024 RS84T507184',
    manufactuer: '삼성전자',
    price: 6090000,
    stock: 50,
    image: '/images/produncts/5',
  },
];

const categoryData: Category[] = [
  {
    category_id: 0,
    category: '전체보기',
    sort: 0,
  },
  {
    category_id: 1,
    category: '노트북',
    sort: 1,
  },
  {
    category_id: 2,
    category: 'TV',
    sort: 2,
  },
  {
    category_id: 3,
    category: '냉장고',
    sort: 3,
  },
];

const ProductCategory = () => {
  //콤보 박스 바인딩될 카테고리 목록
  const [categories, setCategories] = useState<Category[]>([]);

  //콤보 박스에서 선택된 단일 분류 정보
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    category_id: 0,
    category: '전체보기',
    sort: 0,
  });

  //제품 테이블에 바인딩될 제품 목록
  const [products, setProducts] = useState<Product[]>([]);

  //마운팅 시점에서 백엔드의 분류 목록과 제품 목록 데이터 가져옴.
  useEffect(() => {
    setCategories(categoryData);
    setProducts(productData);
    setSelectedCategory({ category_id: 0, category: '전체보기', sort: 0 });
  }, []);

  //특정 상태값이 변경되는 시점을 확인하여 기능 구현
  useEffect(() => {
    const searchResult = productData.filter(
      (item) => item.category_id === selectedCategory.category_id,
    );

    if (selectedCategory.category_id === 0) {
      //전체 카테고리를 선택한 경우 전체 제품데이터 출력
      setProducts(productData);
    } else {
      //기타 카데고리 선택시 관련 제품목록만 출력
      setProducts(searchResult);
    }
  }, [selectedCategory]);

  //선택한 단일 카테고리 정보 조회
  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = categories.find(
      (c) => c.category_id === Number(e.target.value),
    ) as Category;

    setSelectedCategory(category);
  };

  return (
    <>
      {/* 제품 선택 영역 */}
      <div className="sm:col-span-3 m-4">
        <div className="mt-2">
          <select
            value={selectedCategory.category_id}
            onChange={changeCategory}
            autoComplete="category-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {categories.map((item, index) => (
              <option key={index} value={item.category_id}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h1 className="ml-4 mt-8">Product List</h1>

      {/* 제품 목록 영역 */}
      <div className="mt-4 ml-4 mr-4">
        <table className="border-collapse table-auto text-left w-full">
          <thead className="border border-slate-400">
            <tr>
              <th className="border border-slate-400 p-1">제품번호</th>
              <th className="border border-slate-400 p-1">제품명</th>
              <th className="border border-slate-400 p-1">제조사</th>
              <th className="border border-slate-400 p-1">가격</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="border border-slate-400">
                <td className="border border-slate-400 p-1">
                  {item.product_id}
                </td>
                <td className="border border-slate-400 p-1">
                  {item.product_name}
                </td>
                <td className="border border-slate-400 p-1">
                  {item.manufactuer}
                </td>
                <td className="border border-slate-400 p-1">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductCategory;
