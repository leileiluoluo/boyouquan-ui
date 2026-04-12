// 通用请求封装
export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('请求异常');
  return res.json();
}