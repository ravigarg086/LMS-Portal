import { useCallback, useEffect, useId, useRef, useState } from 'react';
import LucideIcon from './LucideIcon';
import { useCourseSearch } from '../hooks/useCourseSearch';
import { scrollToCourse } from '../utils/courseNavigation';
import { COURSE_MIN_SEARCH_LENGTH } from '../../../shared/constants/courses';
import '../course-search.css';

function CourseSearch({ wrapperClassName = 'dashboard-search', placeholder = 'Search courses...', inputId }) {
  const generatedId = useId();
  const searchInputId = inputId || `course-search-${generatedId.replace(/:/g, '')}`;
  const rootRef = useRef(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { results, loading, error } = useCourseSearch(query);

  useEffect(() => {
    if (results.length > 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }
  }, [results]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleSelect = useCallback((course) => {
    setQuery(course.title);
    setOpen(false);
    setActiveIndex(-1);
    scrollToCourse(course.id);
  }, []);

  const handleKeyDown = (event) => {
    if (!open || results.length === 0) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1));
      return;
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      handleSelect(results[activeIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const trimmedQuery = query.trim();
  const showPanel = open && (loading || error || trimmedQuery.length >= COURSE_MIN_SEARCH_LENGTH);

  return (
    <div className="course-search" ref={rootRef}>
      <label className={wrapperClassName} htmlFor={searchInputId}>
        <LucideIcon name="search" size={18} />
        <input
          id={searchInputId}
          type="search"
          value={query}
          placeholder={placeholder}
          aria-label="Search courses"
          aria-expanded={showPanel}
          aria-controls={`${searchInputId}-results`}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${searchInputId}-option-${activeIndex}` : undefined}
          role="combobox"
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (trimmedQuery.length >= COURSE_MIN_SEARCH_LENGTH) {
              setOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
        />
      </label>

      {showPanel && (
        <div
          id={`${searchInputId}-results`}
          className="course-search__panel"
          role="listbox"
          aria-label="Course search results"
        >
          {loading && (
            <p className="course-search__status" role="status">
              Searching courses...
            </p>
          )}

          {!loading && error && (
            <p className="course-search__status course-search__status--error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && trimmedQuery.length >= COURSE_MIN_SEARCH_LENGTH && results.length === 0 && (
            <p className="course-search__status" role="status">
              No courses match &ldquo;{trimmedQuery}&rdquo;.
            </p>
          )}

          {!loading && !error && results.length > 0 && (
            <ul className="course-search__list list-unstyled mb-0">
              {results.map((course, index) => (
                <li key={course.id}>
                  <button
                    id={`${searchInputId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`course-search__option${index === activeIndex ? ' course-search__option--active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(course)}
                  >
                    <span className="course-search__option-title">{course.title}</span>
                    <span className="course-search__option-meta">
                      {[course.category, course.stack, course.duration].filter(Boolean).join(' · ')}
                    </span>
                    {course.tags?.length > 0 && (
                      <span className="course-search__option-tags">{course.tags.join(' · ')}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseSearch;
