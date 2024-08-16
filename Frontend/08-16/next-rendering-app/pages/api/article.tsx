//2024.08.16

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  IArticle,
  ArticleTypeCode,
  BoardTypeCode,
  DisplayTypeCode,
} from '@/Interfaces/article';

type ResponsedDataType = {
  code: number;
  data: IArticle[];
  msg: string;
};

//핸들러 함수 정의
//호출 주소 : http://localhost:3000/api/article
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsedDataType>,
) {
  //백엔드 환경 구축이 되어있지 않아서, 임시 데이터로 응답 (임시 DB 데이터)
  const results: ResponsedDataType = {
    code: 200,
    data: [
      {
        article_id: 1,
        board_type_code: 2,
        title: '게시글1',
        article_type_code: 0,
        contents: '내용1 입니다.',
        view_count: 10,
        ip_address: '111.111.111.111',
        is_display_code: 1,
        reg_date: '2024-08-01T02:07:42.000Z',
        reg_member_id: 1,
        edit_date: null,
        edit_member_id: null,
      },
      {
        article_id: 2,
        board_type_code: 1,
        title: '게시글2',
        article_type_code: 1,
        contents: '내용2 입니다.',
        view_count: 20,
        ip_address: '222.222.222.222',
        is_display_code: 1,
        reg_date: '2024-08-01T02:11:34.000Z',
        reg_member_id: 2,
        edit_date: null,
        edit_member_id: null,
      },
      {
        article_id: 3,
        board_type_code: 2,
        title: '게시글3',
        article_type_code: 0,
        contents: '내용3 입니다.',
        view_count: 30,
        ip_address: '333.333.333.333',
        is_display_code: 1,
        reg_date: '2024-08-02T05:29:45.000Z',
        reg_member_id: 3,
        edit_date: null,
        edit_member_id: null,
      },
      {
        article_id: 4,
        board_type_code: 1,
        title: '게시글4',
        article_type_code: 1,
        contents: '내용4 입니다.',
        view_count: 40,
        ip_address: '444.444.444.444',
        is_display_code: 1,
        reg_date: '2024-08-16T05:08:38.000Z',
        reg_member_id: 4,
        edit_date: null,
        edit_member_id: null,
      },
    ],
    msg: 'OK',
  };

  res.status(200).json(results);
}
