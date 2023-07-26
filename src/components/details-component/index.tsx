import { ReactNode } from "react";
import style from './index.module.scss';

interface DetailsComponentIntf{
    title:string,
    children: ReactNode
}

export default function DetailsComponent(props:DetailsComponentIntf){
    return <div className={style.wrapper}>
        <div className={style.title}>{props.title}</div>
        <div className={style.desc}>{props.children}</div>
    </div>;
}