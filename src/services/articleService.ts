import { request } from '@/utils/request';
import { ArticleDetailData } from '@/types/article'; // 👈 从 types 引入

// 文章详情接口
export async function getArticleDetail(id: number) {
  return request<ArticleDetailData>(`/api/article/${id}`);
}

// 文章列表接口
export async function getArticleList() {
  return request<ArticleDetailData[]>(`/api/article/list`);
}