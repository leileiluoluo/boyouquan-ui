import { request } from '@utils/request';
import { StatData } from '@types/statistics';

export async function getStatistics() {
  return request<StatData>('/api/statistics');
}
