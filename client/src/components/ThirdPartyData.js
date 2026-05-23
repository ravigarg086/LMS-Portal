function ThirdPartyData() {
  return (
    <section id="third-party-data" className="page-section py-5">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <span className="mono-label">Integrations</span>
        <h2 className="heading-tight mb-3">3rd Party Data</h2>
        <p className="text-secondary-custom col-lg-8 mb-4">
          Connect external learning tools, HR systems, and analytics providers to sync
          enrollment, completion, and compliance data with LearnHub LMS.
        </p>
        <div className="row g-3 g-md-4">
          {['SCORM / xAPI', 'Zoom & Teams', 'Salesforce HR', 'Google Workspace'].map((item) => (
            <div key={item} className="col-12 col-sm-6 col-lg-3">
              <div className="glass-card p-4 h-100">
                <h3 className="h6 mb-2">{item}</h3>
                <p className="small text-secondary-custom mb-0">
                  API-ready connector for secure two-way data exchange.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ThirdPartyData;
