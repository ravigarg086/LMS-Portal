const courses = [
  {
    title: 'Full Stack Web Development',
    category: 'Development',
    level: 'Intermediate',
    duration: '12 weeks',
    students: 1240,
    rating: 4.8,
  },
  {
    title: 'Data Science with Python',
    category: 'Data',
    level: 'Beginner',
    duration: '10 weeks',
    students: 980,
    rating: 4.7,
  },
  {
    title: 'UI/UX Design Masterclass',
    category: 'Design',
    level: 'All Levels',
    duration: '8 weeks',
    students: 756,
    rating: 4.9,
  },
  {
    title: 'Cloud Computing & DevOps',
    category: 'Cloud',
    level: 'Advanced',
    duration: '14 weeks',
    students: 642,
    rating: 4.6,
  },
];

function Courses() {
  return (
    <section id="courses" className="courses py-4 py-lg-5">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <div className="row align-items-end mb-4 mb-lg-5 g-3">
          <div className="col-12 col-md-8 col-lg-9">
            <span className="mono-label">Course Catalog</span>
            <h2 className="heading-tight mb-2">Popular programs</h2>
            <p className="mb-0 text-secondary-custom">
              Start learning today with our most enrolled tracks.
            </p>
          </div>
          <div className="col-12 col-md-4 col-lg-3 text-md-end">
            <a href="#contact" className="btn-neon btn-neon--sm w-100 w-md-auto">
              View All
            </a>
          </div>
        </div>

        <div className="row g-3 g-lg-4">
          {courses.map((course) => (
            <div key={course.title} className="col-12 col-sm-6 col-lg-3 d-flex">
              <article className="course-card glass-card h-100 w-100 d-flex flex-column">
                <div className="course-card__thumb">
                  <span className="course-card__tag">{course.category}</span>
                </div>
                <div className="course-card__body flex-grow-1 d-flex flex-column">
                  <h3>{course.title}</h3>
                  <div className="course-card__meta">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="course-card__footer mt-auto">
                    <span>{course.students.toLocaleString()} enrolled</span>
                    <span className="course-card__rating">★ {course.rating}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-neon btn-neon--sm mx-3 mb-3 mt-0 w-auto align-self-stretch"
                >
                  Enroll Now
                </button>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
