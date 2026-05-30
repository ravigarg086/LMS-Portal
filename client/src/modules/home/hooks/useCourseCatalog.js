import { useEffect, useState } from 'react';
import { fetchCourses } from '../../../shared/api/coursesApi';
import { COURSE_CATALOG_LIMIT } from '../../../shared/constants/courses';
import { popularCoursePlaceholders } from '../data/popularCourses';

export function useCourseCatalog({ featured = false, limit = COURSE_CATALOG_LIMIT } = {}) {
  const [courses, setCourses] = useState(popularCoursePlaceholders);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    fetchCourses({ limit, featured: featured || undefined })
      .then(({ courses: apiCourses }) => {
        if (!active || !apiCourses?.length) {
          return;
        }
        setCourses(apiCourses);
        setUsingFallback(false);
      })
      .catch(() => {
        if (active) {
          setUsingFallback(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [featured, limit]);

  return { courses, loading, usingFallback };
}
