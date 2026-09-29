import { formatDate } from '../../util/utilFun';

interface ExperienceDataEleIntf{
    title: string,
    city: string,
    startDate: Date,
    endDate: Date|null,
    employer: string,
    ifCurrentCompany: boolean,
    projectUrl: string,
    techUsed?: string,
    responsibility: string[]
}
interface ExperienceDataIntf{
    data:ExperienceDataEleIntf[]
}

export default function ExperienceComponent(props:ExperienceDataIntf){
    return <ol className="site-timeline">
        {props.data.map((e:ExperienceDataEleIntf)=><li key={e.startDate.getTime()}>
            <article className="tp-card">
                <p className="tp-eyebrow">
                    <time dateTime={e.startDate.toISOString().slice(0, 7)}>{formatDate(e.startDate)}</time>
                    {' – '}
                    {e.ifCurrentCompany || !e.endDate
                        ? 'Present'
                        : <time dateTime={e.endDate.toISOString().slice(0, 7)}>{formatDate(e.endDate)}</time>}
                </p>
                <h3 className="tp-card__title">{e.title}</h3>
                <p className="site-meta">
                    <a href={e.projectUrl} target="_blank" rel="noreferrer">{e.employer}</a> · {e.city}
                </p>
                {e.techUsed && <ul className="site-tags" aria-label="Tech used">
                    {e.techUsed.split(',').map((t)=>t.trim()).filter(Boolean).map((t)=><li key={t}><span className="tp-pill">{t}</span></li>)}
                </ul>}
                <ul className="site-list">
                    {e.responsibility.map((r:string)=><li key={r}>{r}</li>)}
                </ul>
            </article>
        </li>)}
    </ol>;
}
