import { request } from '@/utils/request';
import { PostDataListParams, PostDataList } from '@/types/post';

export async function getPosts({ sortType, keyword, pageNo }: PostDataListParams) {
  const url = `/api/posts?sort=${sortType}&keyword=${keyword}&page=${pageNo}`;
  return request<PostDataList>(url);
}
