const steps = [
  {
    num: '01',
    title: 'Assess & Onboard',
    text: 'Import learners, map skill gaps, and configure roles across departments in one obsidian dashboard.',
  },
  {
    num: '02',
    title: 'Deliver & Track',
    text: 'Launch courses with SCORM support, live sessions, and real-time completion analytics.',
  },
  {
    num: '03',
    title: 'Scale & Certify',
    text: 'Automate certificates, badges, and compliance reporting as your organization grows.',
  },
];

function About() {
  return (
    <section id="about" className="methodology">
      <div className="container px-3 px-md-4 px-xl-5 py-4 py-lg-5">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-6">
            <span className="mono-label methodology-label">Our Methodology</span>
            <h2 className="heading-tight">Built for modern education</h2>
            <p className="methodology-intro">
              LearnHub LMS empowers schools, universities, and corporate training
              teams to deliver engaging online experiences at enterprise scale.
            </p>
            <ul className="methodology__list list-unstyled mb-0">
              {steps.map((step) => (
                <li key={step.num} className="methodology__item">
                  <span className="methodology__num">{step.num}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-6">
            <div className="methodology__visual mx-auto">
              <div className="methodology__portrait" aria-hidden="true" />
              <blockquote className="methodology__testimonial glass mb-0">
                <p>
                  &ldquo;LearnHub transformed how we deliver upskilling — analytics
                  and adaptive paths in one platform.&rdquo;
                </p>
                <cite>— Director of Learning, TechCorp</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
