import { apiRequest } from './httpClient';
import { COURSE_CATALOG_LIMIT } from '../constants/courses';

export function fetchCourses({ search = '', limit = COURSE_CATALOG_LIMIT, featured } = {}) {
  const params = new URLSearchParams();
  if (search.trim()) {
    params.set('search', search.trim());
  }
  if (limit) {
    params.set('limit', String(limit));
  }
  if (featured) {
    params.set('featured', 'true');
  }

  const query = params.toString();
  return apiRequest(`/courses${query ? `?${query}` : ''}`);
}
