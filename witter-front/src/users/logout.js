import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

export function LogoutUser(props) {
    localStorage.setItem('token', null)
    const navigate = useNavigate()
    useEffect(() => {
        return navigate('/login');
    }, [navigate])
}