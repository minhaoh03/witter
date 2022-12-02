import React, {useState, useEffect} from 'react'

export function Weet(props) {
    const {text, privacy, user} = props
    return <div> Text: {text} Privacy: {privacy} User: {user}  </div>
}