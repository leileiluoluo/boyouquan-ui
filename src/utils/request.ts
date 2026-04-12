// 通用请求封装
export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const finalURL = process.env.BOYOUQUAN_API_ADDRESS + url;
  const res = await fetch(finalURL, options);
  if (!res.ok) throw new Error('请求异常');
  return res.json();
}