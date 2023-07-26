interface ExperienceDataEleIntf{
    title: string,
    city: string,
    startDate: string,
    endDate: string|null,
    employer: string,
    ifCurrentCompany: boolean,
    projectUrl: string,
    techUsed: string,
    responsibility: string[]
}
interface ExperienceDataIntf{
    data:ExperienceDataEleIntf[]
}
export default function ExperienceComponent(props:ExperienceDataIntf){

    return <>
        {props.data.map((e:ExperienceDataEleIntf)=><>
            <div><label>{e.title}</label><label>{`${e.startDate} - `+e.ifCurrentCompany?"Current":e.endDate}</label></div>
            <div><label>{e.employer}</label><label>{e.city}</label></div>
            <div><label>Project Url:</label><label>{e.projectUrl}</label></div>
            <div><label>Tech Used:</label><label>{e.techUsed}</label></div>
            <div><label>Responsibilities:</label>
            {e.responsibility.map((e:string)=><p>
                {e}
            </p>)}
            </div>
        </>)
        }
    </>;
}