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
                    <div className='DescriptionFeatures'>To live an adventure with your best friend for life, is what Henry Hotel wants for you, keep beautiful memories in our spaces that in addition to having the required, we always seek to give you an unimaginable experience, enter a beautiful Caribbean environment, where you can access and meet different features that Henry Hotel has prepared for you.</div></div>
                <div className='ContainerHomeFeatures12'>
                    <div className='ContainerHomeFeatures1'>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={petFriendly} src={petFriendly} />Pet Friendly</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={pool} src={pool} />Pool</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={roomService} src={roomService} />Room Service</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={security} src={security} />Security</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={wifi} src={wifi} />Wifi</div>
                    </div>
                    <div className='ContainerHomeFeatures2'>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={air_conditioner} src={air_conditioner} />Air Conditioner</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={cocktail} src={cocktail} />Cocktail</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={gym} src={gym} />Gym</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={laundry} src={laundry} />Laundry</div>
                        <div className='TitleIconFeatures'><img className='ImgFeaturesHome' alt={parking} src={parking} />Parking</div>
                    </div>
                </div>
            </div>
        </div>
    )
}