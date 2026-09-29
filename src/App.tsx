import DetailsComponent from './components/details-component';
import EducationComponent from './components/education-component';
import ExperienceComponent from './components/experience-component';
import SkillsComponent from './components/skills-component';
import SummaryComponent from './components/summary-component';
import ContactComponent from './components/contact-component';
import { educationData, experienceData } from './data/experienceData';
import { FaLocationDot, FaLinkedinIn } from 'react-icons/fa6';
import selfPic from '/self.png';

const sections = [
  { id: 'summary', title: 'Summary' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'contact', title: 'Contact' },
];

// React 18 has no types for the popover API; these pass straight through to the DOM.
const popoverProps = { popover: 'auto' } as Record<string, string>;
const popoverTargetProps = { popovertarget: 'nav-menu' } as Record<string, string>;

const closeNavMenu = () => {
  const menu = document.getElementById('nav-menu') as (HTMLElement & { hidePopover?: () => void }) | null;
  if (menu?.matches(':popover-open')) {
    menu.hidePopover?.();
  }
};

const firstJob = experienceData[experienceData.length - 1].startDate;
const companyCount = new Set(experienceData.map((e) => e.employer)).size;
const yearsOfExperience = new Date().getFullYear() - firstJob.getFullYear();

function App() {
  return (
    <>
      <a className="tp-button tp-button--primary tp-skip-link" href="#main">Skip to content</a>
      <header className="tp-nav">
        <div className="tp-nav__inner">
          <a className="tp-nav__brand" href="#top"><span className="tp-nav__mark" aria-hidden="true"></span>Shoolpani Dubey</a>
          <nav className="tp-nav__menu" id="nav-menu" aria-label="Main" {...popoverProps}>
            <ul className="tp-nav__list">
              {sections.map((s) => (
                <li key={s.id}><a className="tp-nav__link" href={`#${s.id}`} onClick={closeNavMenu}>{s.title}</a></li>
              ))}
            </ul>
          </nav>
          <button className="tp-button tp-button--quiet tp-nav__toggle" type="button" {...popoverTargetProps}>Menu</button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="site-hero" id="top" aria-labelledby="name">
          <div className="site-hero__text">
            <p className="tp-eyebrow">Curriculum vitae</p>
            <h1 id="name">Shoolpani Dubey</h1>
            <p className="site-hero__role">Software Architect</p>
            <p className="site-hero__location"><FaLocationDot aria-hidden="true" /> Helsinki, Finland</p>
            <div className="site-hero__actions">
              <a className="tp-button tp-button--primary" href="#contact">Send a message</a>
              <a className="tp-button" href="https://www.linkedin.com/in/shoolpani-dubey-74638824/" target="_blank" rel="noreferrer">
                <FaLinkedinIn aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
          <img className="site-hero__photo" src={selfPic} alt="Portrait of Shoolpani Dubey" width={894} height={1172} />
        </section>

        <dl className="tp-stats site-stats">
          <div className="tp-stat tp-stat--highlight">
            <dt className="tp-stat__key">Experience</dt>
            <dd className="tp-stat__value">{yearsOfExperience}<span className="tp-stat__unit">years</span></dd>
            <dd className="tp-stat__note">Building software since {firstJob.getFullYear()}</dd>
          </div>
          <div className="tp-stat">
            <dt className="tp-stat__key">Companies</dt>
            <dd className="tp-stat__value">{companyCount}</dd>
            <dd className="tp-stat__note">Across Finland and India</dd>
          </div>
          <div className="tp-stat">
            <dt className="tp-stat__key">Degrees</dt>
            <dd className="tp-stat__value">{educationData.length}</dd>
            <dd className="tp-stat__note">Computer science, AI/ML, medical computing</dd>
          </div>
        </dl>

        <DetailsComponent id="summary" index={1} title="Summary">
          <SummaryComponent />
        </DetailsComponent>
        <DetailsComponent id="skills" index={2} title="Skills">
          <SkillsComponent />
        </DetailsComponent>
        <DetailsComponent id="experience" index={3} title="Experience">
          <ExperienceComponent data={experienceData} />
        </DetailsComponent>
        <DetailsComponent id="education" index={4} title="Education">
          <EducationComponent />
        </DetailsComponent>
        <DetailsComponent id="contact" index={5} title="Contact">
          <ContactComponent />
        </DetailsComponent>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Shoolpani Dubey · Helsinki, Finland</p>
      </footer>
    </>
  )
}

export default App
