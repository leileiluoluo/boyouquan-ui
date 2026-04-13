export interface PostDataListParams {
  sortType: string;
  keyword?: string;
  pageNo: number;
}

export interface PostDataList {
  pageSize: number;
  total: number;
  results: PostData[];
}

export interface PostData {
  blogAddress: string;
  blogAdminLargeImageURL: string;
  blogDomainName: string;
  blogName: string;
  blogStatusOk: boolean;
  description: string;
  draft: boolean;
  link: string;
  linkAccessCount: number;
  pinned: boolean;
  publishedAt: string;
  recommended: boolean;
  title: string;
  blogTotalAccessCount: number;
  blogJoinYears: number;
}
