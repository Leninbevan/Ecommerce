import './about.scss'
import AboutImage1 from '../../assests/aboutImage1.png'
import AboutImage2 from '../../assests/aboutImage2.png'
import { Box } from '@mui/system'

function About() {
    return (
        <>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Box sx={{fontSize:'larger'}}>
                    Who We Are <br />
                    SMART SHOPPING is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. WE-6 SHOPPING strives to be Earth’s most customer-centric company, Earth’s best employer, and Earth’s safest place to work. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by WE-6 SHOPPING, AWS, Kindle Direct Publishing, Kindle, Career Choice, Fire tablets, Fire TV, WE-6 SHOPPING Echo, Alexa, Just Walk Out technology, WE-6 SHOPPING Studios, and The Climate Pledge are some of the things pioneered by WE-6 SHOPPING.
                </Box>
                <Box>
                    <img src={AboutImage1} alt="" />
                </Box>
            </Box>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Box>
                    <img src={AboutImage2} alt="" />
                </Box>
                <Box sx={{fontSize:'larger'}}>
                    Working to earn and keep our customers’ trust is the single biggest driver of Amazon’s Day 1 approach. Amazon’s decision-making process asks employees to consider whether an action is a one-way door—consequential and nearly irreversible—or a two-way door, easy to change course and go back. Discover more about who we are through our Annual Letters to Shareholders from 1997 through today.
                </Box>
            </Box>
        </>
    )
}
export default About