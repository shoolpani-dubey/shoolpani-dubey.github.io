import { educationData } from "../../data/experienceData";
import { formatDate } from "../../util/utilFun";
import style from './index.module.scss';
interface EducationDataEleIntf{
    university:string,
    degree:string,
    country: string,
    graduationDate:Date
}

export default function EducationComponent(){
    return <>
        {educationData.map((e:EducationDataEleIntf)=><div className={style.wrapper}>
            <div className={style.title}>
                <label>{e.university}</label>
                <label>{`, ${e.country} `}</label>
                <label>{`( ${formatDate(e.graduationDate)} )`}</label>
            </div>
            <label className={style.subtitle}>{e.degree}</label>
        </div>)}
    </>;
}