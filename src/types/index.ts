// 通用类型定义

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface Statistics {
  totalBlogs: number;
  totalPosts: number;
  totalAccesses: number;
}

export interface Blog {
  id?: number;
  domain: string;
  name: string;
  statusOk: boolean;
  adminMediumImageURL?: string;
  rssAddress?: string;
}

export interface Post {
  id?: number;
  blogDomainName: string;
  blogName: string;
  blogStatusOk: boolean;
  blogAdminMediumImageURL?: string;
  link: string;
  title: string;
  description?: string;
  publishedAt: string;
  linkAccessCount?: number;
  pinned?: boolean;
}

export interface BlogRequest {
  id?: number;
  domain: string;
  name?: string;
  email: string;
  rssAddress?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  username: string;
  sessionId: string;
}

export interface FormError {
  [key: string]: string;
}

export interface MonthlySelected {
  id?: number;
  title: string;
  description?: string;
  link: string;
  publishedAt?: string;
}

export interface RecommendedPost {
  id?: number;
  title: string;
  link: string;
  blogDomainName: string;
  publishedAt?: string;
}

export interface Moment {
  id?: number;
  content: string;
  imageURL?: string;
  createdAt?: string;
}

export interface LinkGraphNode {
  id: string;
  name: string;
  value?: number;
}

export interface LinkGraphEdge {
  source: string;
  target: string;
  value?: number;
}

export interface LinkGraphData {
  nodes: LinkGraphNode[];
  links: LinkGraphEdge[];
}

export interface PostInfo {
  title: string;
  description: string;
  link: string;
  blogName: string;
  blogDomainName: string;
  blogStatusOk: boolean;
  blogAdminMediumImageURL?: string;
  publishedAt: string;
  linkAccessCount?: number;
}

export interface BlogRequestInfo {
  id?: number;
  name: string;
  description: string;
  domain: string;
  email?: string;
  rssAddress?: string;
  status?: string;
  posts: Post[];
  createdAt?: string;
  updatedAt?: string;
}

// 环境变量类型声明
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOYOUQUAN_API_ADDRESS: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};

