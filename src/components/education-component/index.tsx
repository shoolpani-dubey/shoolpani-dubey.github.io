import { educationData } from "../../data/experienceData";

interface EducationDataEleIntf{
    university:string,
    degree:string,
    country: string,
    graduationDate:Date
}

export default function EducationComponent(){
    return <div className="site-grid">
        {educationData.map((e:EducationDataEleIntf)=><article key={e.university} className="tp-card">
            <p className="tp-eyebrow"><time dateTime={String(e.graduationDate.getFullYear())}>{e.graduationDate.getFullYear()}</time> · {e.country}</p>
            <h3 className="tp-card__title">{e.degree}</h3>
            <p className="tp-card__body">{e.university}</p>
        </article>)}
    </div>;
}
