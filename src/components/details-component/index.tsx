import { ReactNode } from "react";

interface DetailsComponentIntf{
    id: string,
    index: number,
    title: string,
    children: ReactNode
}

export default function DetailsComponent(props:DetailsComponentIntf){
    return <section className="site-section" id={props.id} aria-labelledby={`${props.id}-title`}>
        <div className="site-section__head">
            <p className="tp-eyebrow" aria-hidden="true">{String(props.index).padStart(2, '0')}</p>
            <h2 id={`${props.id}-title`}>{props.title}</h2>
        </div>
        <div className="site-section__body">{props.children}</div>
    </section>;
}
