import { skills } from "../../data/experienceData";

export default function SkillsComponent(){
    return <ul className="site-tags">
        {skills.map((e:string)=><li key={e}><span className="tp-pill">{e}</span></li>)}
    </ul>;
}
