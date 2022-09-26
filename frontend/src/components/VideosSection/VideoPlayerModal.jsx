import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  Player } from "video-react";

function VideoPlayerModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
         
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Player
        autoPlay
         fluid={false}
         width="100%"
         height={500}>
        <source src={props.url} />
        </Player>
       
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-dark' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VideoPlayerModal
