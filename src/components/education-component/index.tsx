import { educationData } from "../../data/experienceData";

interface EducationDataEleIntf{
    university:string,
    degree:string,
    country: string,
    graduationDate:Date
}

export default function EducationComponent(){
    return <>
        {educationData.map((e:EducationDataEleIntf)=><>
            <div>
                <label>{e.university}</label>
                <label>{`(${e.country})`}</label>
                <label>{`, ${e.graduationDate}`}</label>
            </div>
            <label>{e.degree}</label>
        </>)}
    </>;
}