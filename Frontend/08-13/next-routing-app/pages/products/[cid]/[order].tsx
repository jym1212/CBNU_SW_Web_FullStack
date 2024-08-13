// 2024.08.13
// 제품 카테고리 페이지

import { useRouter } from 'next/router';

const ProductCategory = () => {
  const router = useRouter();

  return (
    <div>
      제품 카테고리 : {router.query.cid} - 정렬 : {router.query.order}
    </div>
  );
};

export default ProductCategory;
