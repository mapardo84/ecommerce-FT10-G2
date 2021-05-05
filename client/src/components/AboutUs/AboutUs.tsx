import { Button } from 'antd'
import React, { useEffect } from 'react'
import "./AboutUs.less"
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const AboutUs = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const AboutUsArray = [
        {
            name: "Malena Goñi",
            linkedIn: "https://www.linkedin.com/in/malena-goñi/",
            github: "https://github.com/malenagoni",
            imagen: "/profile/monoMalena.jpg",
        },
        {
            name: "Hector Ruiz",
            linkedIn: "https://www.linkedin.com/in/hector-ruiz-13935141/",
            github: "https://github.com/hruiz13",
            imagen: "/profile/monoHector.jpg",
        },
        {
            name: "Rodrigo Velazco",
            linkedIn: "https://www.linkedin.com/in/rodrigo-velazco/",
            github: "https://github.com/rodrigovelazco7997",
            imagen: "/profile/monoRodri.jpg",
        },
        {
            name: "Francisco Baca",
            linkedIn: "https://www.linkedin.com/in/franbaca13/",
            github: "https://github.com/FranBaca",
            imagen: "/profile/monoPanchito.jpg",
        },
        {
            name: "Nicolás Borzone",
            linkedIn: "https://www.linkedin.com/in/nicolasborzone/",
            github: "https://github.com/nhoga",
            imagen: "/profile/monoNico.jpg",
        },
        {
            name: "Juan Cruz Monzani",
            linkedIn: "https://www.linkedin.com/in/juancmonzani/",
            github: "https://github.com/jmonzani",
            imagen: "/profile/monoJuan.jpg",
        },
        {
            name: "Mauricio Pardo",
            linkedIn: "https://www.linkedin.com/in/mauricio-pardo-varon/",
            github: "https://github.com/mapardo84",
            imagen: "/profile/monoMauricio.jpg",
        },
        {
            name: "Cristóbal Zepeda",
            linkedIn: "https://www.linkedin.com/in/cristobal-zepeda/",
            github: "https://github.com/PateFunky",
            imagen: "/profile/monoCristo.jpg",
        },
        {
            name: "David Barona",
            linkedIn: "http://www.linkedin.com/in/davidbaronamurcia",
            github: "https://github.com/Davidbarona",
            imagen: "/profile/monoDavid.jpg",
        },
        {
            name: "Gabriel Patiño",
            linkedIn: "https://www.linkedin.com/in/gabrielEstebanp/",
            github: "https://github.com/lgaespa",
            imagen: "/profile/monoGabriel.jpg",
        },
    ]

    let team = AboutUsArray.sort(function () { return Math.random() - 0.5 })

    return (
        <div className="aboutUsContainer">
            <div className="titleAboutUs">DEVELOPMENT TEAM</div>
            <div className="descriptionAboutUs">This application was developed by a team of full stack developers, which used the following technologies for its development: TypeScriptSupaBase Express React Js Redux Ant Design Less The whole project was carried out under Scrum methodologies where the following people participated
            </div>

            {
                team.map((e) =>
                    <div className="flip-card">
                        <div className="flip-card-inner">

                            <div className="flip-card-front">
                                <img className="imageProfileAboutUs" src={e.imagen} alt="Avatar" />
                                <div className="aboutUsName">{e.name}</div>
                            </div>

                            <div className="flip-card-back">
                                <div className="aboutUsIcons">
                                    <Button type="text" href={e.linkedIn}><AiFillLinkedin style={{ color: "white", fontSize: "35px" }} /></Button>
                                    <Button type="text" href={e.github}><AiFillGithub style={{ color: "white", fontSize: "35px" }} /></Button>
                                </div>
                                <div className="aboutUsName1">{e.name}</div>

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AboutUs
