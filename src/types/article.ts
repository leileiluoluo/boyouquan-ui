// 文章详情
export interface ArticleDetailData {
  nickname: string;
  performance: string;
  views: number;
  title: string;
  content: string;
  publishTime: string;
  readInfo: string;
}

// 文章列表项
export interface ArticleItem {
  id: number;
  title: string;
  publishTime: string;
}

// 以后所有文章相关类型都写在这里