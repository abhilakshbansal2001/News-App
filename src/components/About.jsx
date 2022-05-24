import React from 'react'
import {useHistory } from 'react-router-dom'
import '../styles/about.css'
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import YouTubeIcon from '@material-ui/icons/YouTube';

const About = () => {

    const history = useHistory();


    return (
        <div className="author-about">
            <div className="left-author">
                <div className="author-name">
                <p>A simple News App made by:- </p>
                <h1>Abhilaksh Bansal</h1>
                <h5>Full Stack Developer</h5>

                <div className="follow-icon">
                    <a href="https://www.instagram.com/abhi00154/" target="_blank"><InstagramIcon className="icon-follow"/></a>
                    <a href="https://github.com/abhilakshbansal2001" target="_blank"><GitHubIcon className="icon-follow"/></a>
                    <a href="https://abhilakshbansal2001.github.io/abhilakshbansal/#contact" target="_blank"><LanguageIcon className="icon-follow"/></a>
                    <a href="https://www.youtube.com/channel/UCPHoVE4SmxyP7p_Nk-VzN7Q" target="_blank"><YouTubeIcon className="icon-follow"/></a>

                </div>
                </div>
            </div>
            <div className="right-author">
                <img src="https://pbs.twimg.com/media/BduTxWnIUAAKT_5.jpg" alt=""/>
            </div>
          
        </div>
    )
}

export default About
