import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdidasIcon from '../../assests/adidasIcon.png'
import AppleIcon from '../../assests/appleIcon.png'
import Electronics from '../../assests/electronics.png'
import HomeShoppingImage from '../../assests/homeshoppingImage.png'
import Jewellery from '../../assests/jewellery.png'
import MensClothing from '../../assests/mensClothing.png'
import NikeIcon from '../../assests/nikeIcon.png'
import PumaIcon from '../../assests/pumaIcon.png'
import reebok from '../../assests/reebokIcon.png'
import Walmart from '../../assests/walmartIcon.png'
import XboxIcon from '../../assests/xboxIcon.png'
import './home.scss'

function Home() {
    const steps = [
        {
            label: 'Select campaign settings',
            description: <>
                <img src={HomeShoppingImage} alt="" className='homeBannerImage' />
                <div className='imageBg'></div>
            </>,
        },
        {
            label: 'Create an ad group',
            description: <>
                <img src={MensClothing} alt="" className='homeBannerImage' />
                <div className='imageBg'></div>
            </>,
        },
        {
            label: 'Create an ad',
            description: <>
                <img src={Jewellery} alt="" className='homeBannerImage' />
                <div className='imageBg'></div>
            </>,
        },
        {
            label: 'Create an ad',
            description: <>
                <img src={Electronics} alt="" className='homeBannerImage' />
                <div className='imageBg'></div>
            </>,
        },
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    let tempActiveStep = 0;
    const maxSteps = steps.length;
    const pageTheme=useSelector(state=>state.product.theme)

    useEffect(() => {
        const imageRotation = setInterval(() => {
            if (tempActiveStep + 1 < maxSteps) {
                tempActiveStep += 1;
                setActiveStep(tempActiveStep);
            }
            else {
                tempActiveStep = 0;
                setActiveStep(tempActiveStep);
            }
        }, 3000);

        return () => clearInterval(imageRotation)
    }, [])

    return (
        <>
            <div>
                <div className='homeContent'>
                    <div className='homeTextContent'>
                        <div>
                            <p className='bannerContent'>Greatest journey with your shopping assistant</p>
                        </div>
                        <div className='adminLogin'>
                            <p className='adminTitle'>Admin Login</p>
                            <div className='adminLoginForm'>
                                <input type="email" className='adminInput' />
                                <button className='adminLoginButton'>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className='homeBannerImageDiv'>
                        {/* <img src={HomeShoppingImage} alt="" className='homeBannerImage' />
                        <div className='imageBg'></div> */}
                        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                            <Box sx={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{width:'100%'}}>
                                    {steps[activeStep].description}
                                </Box>
                            </Box>
                            <MobileStepper
                                activeStep={activeStep}
                            />
                        </Box>
                    </div>
                </div>
            </div>
            <div className='homeBottomOuter'>
                <div className={`homeBottom  ${pageTheme==='light' ? 'bgColorDark' : 'bgColorLight'}`}>
                    <div>
                        <p className='partnerCount'>1800+</p>
                        <p className='partnerText'>Trusted partners</p>
                    </div>
                    <div className='horizondalLine'></div>
                    <div className={`bottomIcons`}>
                        <img src={AdidasIcon} alt="" width={'60px'} />
                        <img src={XboxIcon} alt="" width={'45px'} />
                        <img src={NikeIcon} alt="" width={'80px'} />
                        <img src={PumaIcon} alt="" width={'50px'} />
                        <img src={reebok} alt="" width={'90px'} height={'50px'} />
                        <img src={AppleIcon} alt="" width={'60px'} height={'50px'} />
                        <img src={Walmart} alt="" width={'80px'} height={'80px'} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home