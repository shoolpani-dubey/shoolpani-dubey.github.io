import appStyle from './App.module.scss'
import DetailsComponent from './components/details-component';
import EducationComponent from './components/education-component';
import ExperienceComponent from './components/experience-component';
import SkillsComponent from './components/skills-component';
import SummaryComponent from './components/summary-component';
import { experienceData } from './data/experienceData';
// import selfPic from '/self_pic.jpeg';
import {FaLocationDot, FaLinkedinIn} from 'react-icons/fa6';
import {MdEmail} from 'react-icons/md';
import selfVideo from '/test.mp4';
import selfPic from '/self.png';
import { useRef, useState } from 'react';
function App() {
  const videoRef = useRef(null);
  const [unmuteBtnVisible, setUnmuteBtnVisible]=useState(true);
  const onUnmute = () => {
    if(!videoRef?.current)return;
    const videoEle:HTMLVideoElement = videoRef.current;
    videoEle.muted = false;
    setUnmuteBtnVisible(false);
  };

  return (
    <>
    <div id="google_translate_element"></div>
      <div className={appStyle.body}>
        {/* <div className={appStyle.videoBlock}>
          <video ref={videoRef} controls autoPlay={true} muted={true}>
            <source src={selfVideo} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          {unmuteBtnVisible
          && <button
            onClick={onUnmute}
            className={appStyle.videoUnmute}>Unmute</button>}
        </div> */}
        {/* <div className={appStyle.firstBlock}>
          <img className={appStyle.picImg} src={selfPic} alt="user picture"/>
          <div className={appStyle.picDesc}>
            <h1 className={appStyle.h1}>Shoolpani Dubey</h1>
            <div className={appStyle.h2}>Senior Fullstack Developer</div>
            <div className={appStyle.h3}><FaLocationDot/><label className={appStyle.h3Label}>Turku, Finland</label></div>
            <div className={appStyle.h3}><FaLinkedinIn/><a className={appStyle.h3Label} target='_blank' href={'https://www.linkedin.com/in/shoolpani-dubey-74638824/'}>https://www.linkedin.com/in/shoolpani-dubey-74638824/</a></div>
            <div className={appStyle.h3}><MdEmail/><a className={appStyle.h3Label} href={'mailto:shool.pani.dubey@gmail.com'}>shool.pani.dubey@gmail.com</a></div>
          </div>
        </div> */}
        <div className={appStyle.picBlock}>
          <div className={appStyle.textDiv}>
            <div className={appStyle.textCntr}>
              <h1 className={appStyle.h1}>Shoolpani Dubey</h1>
              <div className={appStyle.h2}>Senior Fullstack Developer</div>
              <div className={appStyle.h3}><FaLocationDot/><label className={appStyle.h3Label}>Turku, Finland</label></div>
              <div className={appStyle.h3}><FaLinkedinIn/><a className={appStyle.h3Label} target='_blank' href={'https://www.linkedin.com/in/shoolpani-dubey-74638824/'}>https://www.linkedin.com/in/shoolpani-dubey-74638824/</a></div>
              <div className={appStyle.h3}><MdEmail/><a className={appStyle.h3Label} href={'mailto:shool.pani.dubey@gmail.com'}>shool.pani.dubey@gmail.com</a></div>
            </div>
          </div>
          <img src={selfPic} />
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
