// 2024.08.13
// 블로그 상세 페이지

import { useRouter } from 'next/router';

const BlogDetail = () => {
  const router = useRouter();

  //http://localhost:3000/blogs/detail?id=1&name=NextJs
  const id = router.query.id;
  const name = router.query.name;

  return (
    <div className="h-[700px]">
      BlogDetail id : {router.query.id} - name : {router.query.name}
    </div>
  );
};

export default BlogDetail;
