import { skills } from "../../data/experienceData";
import style from './index.module.scss';

export default function SkillsComponent(){

    return <ul className={style.testStyle}>
            {
                skills.map((e:string)=><li>
                    {e}
                </li>)
            }
        </ul>;
}