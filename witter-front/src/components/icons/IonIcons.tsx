import { ioniconMap as iconMap } from './ioniconsHelper'
import React from 'react'
import { IonIcon } from "@ionic/react";

interface IonIconProps {
    icon: string,
    size: string,
    styles: {[key: string] : any;},
}

export function IonIcons(props: IonIconProps) {
    let {icon, size, styles} = props
    icon = iconMap[icon]
    return (
        <IonIcon style = {styles} size = {size} name = {icon}/>
    )
}