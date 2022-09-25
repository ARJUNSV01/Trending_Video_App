
import axios from 'axios'
import { useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import { serverURL } from '../../serverUrl'
import ReactPlayer from 'react-player'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const VideosSection = () => {
    const [videos,setVideos] = useState([])
    const [refresh,setRefresh]=useState('')

    // const fetchVideos = async()=>{
    //  const {data} = await axios.get(`${serverURL}/api/videos/fetchVideos`)
    //     return data
    // }

    useEffect(() => {
    axios.get(`${serverURL}/api/videos/fetchVideos`).then(({data})=>{
       
        setVideos(data)
    })

    }, [refresh])
    
  return (
    <Container fluid>
          <div className="row">
        {videos?videos.map((video)=>{
            return (
             
               <div className="col-12 col-md-3 col-sm-6 mt-5">
                  {/* <p>{video.url}</p> */}
<ReactPlayer  width='100%' height='300px' controls url='http://res.cloudinary.com/groovy-planet/video/upload/v1664127501/gmiofbjctunhxdwoj972.mp4' />
               </div>
                    )
                }):''}
                </div> 
   </Container> 
  )
}

export default VideosSection