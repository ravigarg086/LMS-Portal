import { useTypingEffect } from '../hooks/useTypingEffect';
import { SECTION_IDS } from '../constants';
import VibeInputBox from './VibeInputBox';
import IntegrationBar from './IntegrationBar';

const TYPING_TEXT = 'Build skills across MEAN, MERN, and DevOps — at your pace.';

function HomeHero() {
  const { displayed, isComplete } = useTypingEffect(TYPING_TEXT);

  return (
    <section id={SECTION_IDS.home} className="hero-atmospheric page-section">
      <div className="hero-atmospheric__grid" aria-hidden="true" />
      <div className="hero-atmospheric__glow hero-atmospheric__glow--left" aria-hidden="true" />
      <div className="hero-atmospheric__glow hero-atmospheric__glow--right" aria-hidden="true" />

      <div className="container hero-atmospheric__content text-center">
        <div className="hero-atmospheric__badge">
          <span className="hero-atmospheric__badge-new">New</span>
          <span>Adaptive learning engine</span>
        </div>

        <h1 className="hero-atmospheric__headline font-serif">
          Learn beyond
          <br />
          <em>every limit.</em>
        </h1>

        <p className="hero-atmospheric__subheading font-body">
          {displayed}
          <span className={`typing-cursor${isComplete ? ' typing-cursor--idle' : ''}`} aria-hidden="true">
            |
          </span>
        </p>

        <VibeInputBox />
      </div>

      <div className="container hero-atmospheric__integration">
        <IntegrationBar />
      </div>
    </section>
  );
}

export default HomeHero;
