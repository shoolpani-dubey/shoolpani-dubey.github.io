import appStyle from './App.module.scss'
import DetailsComponent from './components/details-component';
import EducationComponent from './components/education-component';
import ExperienceComponent from './components/experience-component';
import SkillsComponent from './components/skills-component';
import SummaryComponent from './components/summary-component';
import { experienceData } from './data/experienceData';
import selfPic from '/self_pic.jpeg';
import {FaLocationDot} from 'react-icons/fa6';
function App() {

  return (
    <>
      <div className={appStyle.body}>
        <div className={appStyle.firstBlock}>
          <div className={appStyle.pic}>
            <img className={appStyle.picImg} src={selfPic} alt="user picture"/>
          </div>
          <div className={appStyle.picDesc}>
            <h1 className={appStyle.h1}>Shoolpani Dubey</h1>
            <div className={appStyle.h2}>Senior Fullstack Developer</div>
            <div className={appStyle.h3}><FaLocationDot/><label className={appStyle.h3Label}>Turku, Finland</label></div>
          </div>
        </div>
        <div className={appStyle.detailsBlock}>
          <DetailsComponent title='Summary'>
            <SummaryComponent/>
          </DetailsComponent>
        </div>
        <div className={appStyle.detailsBlock}>
          <DetailsComponent title='Skills'>
            <SkillsComponent/>
          </DetailsComponent>
        </div>
        <div className={appStyle.detailsBlock}>
          <DetailsComponent title='Experience'>
            <ExperienceComponent data={experienceData}/>
          </DetailsComponent>
        </div>
        <div className={appStyle.detailsBlock}>
          <DetailsComponent title='Education'>
            <EducationComponent/>
          </DetailsComponent>
        </div>
      </div>
    </>
  )
}

export default App
