import air_conditioner from './img/air-conditioning.png'
import cocktail from './img/Cocktails.png'
import gym from './img/Gym.png'
import laundry from './img/Laundry.png'
import parking from './img/Parking.png'
import petFriendly from './img/PetFriendly.png'
import pool from './img/Pool.png'
import roomService from './img/RoomService.png'
import security from './img/Security.png'
import wifi from './img/Wifi.png'
import './HomeFeatures.less'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


export const HomeFeatures = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className='ContainerHomeFeatures'>
                <div className='TitleDescriptionFeatures'>
                    <div className='TitleFeatures'>FEATURES</div>
                    <div className='DescriptionFeatures'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae nemo nulla minus, sit eius delectus reprehenderit
                    praesentium saepe voluptatem at quam nam,
                    sint itaque tempore ullam culpa unde perspiciatis. Laboriosam
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae nemo nulla minus, sit eius delectus reprehenderit
                    praesentium saepe voluptatem at quam nam,
                  sint itaque tempore ullam culpa unde perspiciatis. Laboriosam.</div></div>
                <div className='ContainerHomeFeatures12'>
                    <div className='ContainerHomeFeatures1'>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={petFriendly} />Pet Friendly</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={pool} />Pool</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={roomService} />Room Service</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={security} />Security</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={wifi} />Wifi</div>
                    </div>
                    <div className='ContainerHomeFeatures2'>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={air_conditioner} />Air Conditioner</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={cocktail} />Cocktail</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={gym} />Gym</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={laundry} />Lundry</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' src={parking} />Parking</div>
                    </div>
                </div>
            </div>
        </div>
    )
}