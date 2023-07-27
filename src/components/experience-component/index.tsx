import style from './index.module.scss';
interface ExperienceDataEleIntf{
    title: string,
    city: string,
    startDate: Date,
    endDate: Date|null,
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
    const monthNames:string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const formatDate = (data:Date|null)=>{
        if(!data){
            return '';
        }
        const month = monthNames[data.getMonth()];
        const year = data.getFullYear();
        return `${month}, ${year}`;
    }
    return <>
        {props.data.map((e:ExperienceDataEleIntf)=><div key={e.startDate.getTime()} className={style.expCont}>
            <div className={style.expTitle}><label>{e.title}</label><label> ( {`${formatDate(e.startDate)} - `+(e.ifCurrentCompany?"Current":formatDate(e.endDate))} )</label></div>
            <div className={style.employer}><label>{e.employer}</label><label> ( {e.city} )</label></div>
            <div><label className={style.expCatTitle}>Project Url:</label><label>{e.projectUrl}</label></div>
            <div><label className={style.expCatTitle}>Tech Used:</label><label>{e.techUsed}</label></div>
            <div><label className={style.expCatTitle}>Responsibilities:</label>
            <ul>{e.responsibility.map((e:string)=><li>
                {e}
            </li>)}
            </ul>
            </div>
        </div>)
        }
    </>;
}