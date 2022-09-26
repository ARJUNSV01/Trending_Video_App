import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';

function LogoutModal(props) {
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    props.onHide()
    localStorage.removeItem("access_token");
    dispatch(logout());

  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alert
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='fs-5 '>Are you sure you want to logout?</p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>No</Button>
        <Button variant='success' onClick={handleLogout}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default LogoutModal