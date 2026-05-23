const bentoItems = {
  large: {
    title: 'Real-time Analytics',
    description:
      'Instructors get live dashboards for attendance, quiz scores, and completion rates across every cohort.',
    bars: [40, 65, 45, 80, 55, 90, 70],
  },
  tall: {
    title: 'Design Tokens',
    description: 'Obsidian & Lime system palette for consistent UI.',
    swatches: [
      { label: 'Lime', color: '#ccff00' },
      { label: 'Emerald', color: '#10b981' },
      { label: 'Obsidian', color: '#0c0c0c' },
      { label: 'Glass', color: 'rgba(255,255,255,0.03)' },
    ],
  },
  accent: {
    title: 'Quick Course Setup',
    description:
      'Upload videos, PDFs, and quizzes in minutes with drag-and-drop builders.',
  },
  defaults: [
    {
      title: 'Personalized Paths',
      description:
        'Adaptive recommendations help each learner focus on skills that matter most.',
    },
    {
      title: 'Collaborative Hub',
      description:
        'Built-in forums and Q&A threads keep cohorts engaged between live sessions.',
    },
    {
      title: 'Secure & Compliant',
      description:
        'Role-based access, encrypted data, and audit logs protect your institution.',
    },
    {
      title: 'Learn Anywhere',
      description:
        'Fully responsive — study on desktop, tablet, or mobile on your schedule.',
    },
  ],
};

function Features() {
  return (
    <section id="features" className="features py-4 py-lg-5">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <div className="section-header mb-4 mb-lg-5">
          <span className="mono-label">Platform Capabilities</span>
          <h2 className="heading-tight">Built for the future of learning</h2>
          <p className="mb-0">
            A bento-grid experience packing analytics, design consistency, and
            enterprise-grade tools into one obsidian shell.
          </p>
        </div>

        <div className="row g-3 g-lg-4">
          <div className="col-12 col-md-6 col-xl-6">
            <article className="bento-card bento-card--large glass-card h-100">
              <div>
                <span className="mono-label">Data Visualization</span>
                <h3>{bentoItems.large.title}</h3>
                <p>{bentoItems.large.description}</p>
              </div>
              <div className="bento-bars" aria-hidden="true">
                {bentoItems.large.bars.map((h, i) => (
                  <div
                    key={i}
                    className="bento-bar"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </article>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <article className="bento-card bento-card--tall glass-card h-100">
              <span className="mono-label">Color System</span>
              <h3>{bentoItems.tall.title}</h3>
              <p>{bentoItems.tall.description}</p>
              <div className="bento-swatches">
                {bentoItems.tall.swatches.map((s) => (
                  <div key={s.label} className="bento-swatch glass">
                    <span>{s.label}</span>
                    <span
                      className="bento-swatch__chip"
                      style={{ background: s.color }}
                    />
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <article className="bento-card glass-card h-100">
              <h3>{bentoItems.defaults[0].title}</h3>
              <p>{bentoItems.defaults[0].description}</p>
            </article>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <article className="bento-card glass-card h-100">
              <h3>{bentoItems.defaults[1].title}</h3>
              <p>{bentoItems.defaults[1].description}</p>
            </article>
          </div>

          <div className="col-12 col-md-6 col-xl-6">
            <article className="bento-card bento-card--accent h-100">
              <span className="mono-label bento-card--accent-label">Featured</span>
              <h3>{bentoItems.accent.title}</h3>
              <p>{bentoItems.accent.description}</p>
            </article>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <article className="bento-card glass-card h-100">
              <h3>{bentoItems.defaults[2].title}</h3>
              <p>{bentoItems.defaults[2].description}</p>
            </article>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <article className="bento-card glass-card h-100">
              <h3>{bentoItems.defaults[3].title}</h3>
              <p>{bentoItems.defaults[3].description}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
