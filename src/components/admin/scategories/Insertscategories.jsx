import React, { useEffect, useState } from 'react';
import {toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {useDispatch, useSelector} from "react-redux";
import { createScategorie } from '../../../features/scategorieSlice';
import { getCategories } from '../../../features/categorieSlice';



registerPlugin(FilePondPluginImageExifOrientation,FilePondPluginImagePreview)
const Insertscategories = () => {

  const [files, setFiles] = useState([]);
const [validated, setValidated] = useState(false);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const dispatch = useDispatch();




const {categories,isLoading} = useSelector((state) =>state.storecategories);
useEffect(() => {
    dispatch(getCategories());
    },[dispatch]);



const[scategorie,setScategorie]=useState({})

const handlechange=(e)=>{
setScategorie({...scategorie,[e.target.name]:e.target.value})
}

const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (form.checkValidity() === true) {
  
  //faire le add dans la BD
  dispatch(createScategorie(scategorie))
  .then(res => {
      console.log("Insert OK",res);
      toast("Scategorie ajouté", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,progress: undefined,
      })
    handleReset()
  setValidated(false);
     })
  .catch(error=>{
  console.log(error)
  alert("Erreur ! Insertion non effectuée")
  })
  }
  setValidated(true);
  }
  

const handleReset=()=>{
  setScategorie({})
  handleClose()
  setFiles([])
  }


  const serverOptions = () => { console.log('server pond');
  return {

  process: (fieldName, file, metadata, load, error, progress, abort)=> {
  
  console.log(file)
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'esps2024');
  data.append('cloud_name', 'de6mllwc6');
  data.append('public_id', file.name);
  
  axios.post('https://api.cloudinary.com/v1_1/de6mllwc6/image/upload', data)
  
  .then((response) => response.data)
  .then((data) => {
  console.log(data);
  setScategorie({...scategorie,imagescat:data.url}) ;
  load(data);
  })
  .catch((error) => {
  console.error('Error uploading file:', error);
  error('Upload failed');
  abort();
  });
  },
  };
  };


  return (
    <div >
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
            <Button
     onClick={handleShow}
    className="btn btn-outline-light"
    
     style={{float: 'left','margin':10,'left':10,fontFamily:'Arial'}}>
    <i className="fa-solid fa-circle-plus"></i>
    &nbsp;
    Nouveau
    </Button>
               
    
             
            </div>
          </nav>
    
    <Modal show={show} onHide={handleClose}>
     <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Modal.Header closeButton>
     <h1>Create sous-categorie</h1>
    </Modal.Header>
    <Modal.Body>
<div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Nom sous-catégorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="nom-sous-categorie"
name="nomscategorie"
value={scategorie.nomscategorie}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir nom categorie
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="12">
<Form.Label>Catégorie</Form.Label>
<Form.Control
as="select"
type="select"
name="categorieID"
value={scategorie.categorieID}
onChange={(e)=>handlechange(e)}
>
<option></option>
{categories.map((cat)=><option key={cat._id}
value={cat._id}>{cat.nomcategorie}</option>
)}
</Form.Control>
</Form.Group>
</Row>

      
<div style={{ width: "80%", margin: "auto", padding: "1%" }}>
<FilePond

files={files}
acceptedFileTypes="image/*"
onupdatefiles={setFiles}
allowMultiple={true}
server={serverOptions()}
name="file"

/>
</div>
</div>
</div>
</div>
</Modal.Body>
<Modal.Footer>
<Button type="submit">Enregistrer</Button>
<Button type="button" className="btn btn-warning"
onClick={()=>handleReset()}>Annuler</Button>
</Modal.Footer>
</Form>
</Modal>


</div>
  )
}

export default Insertscategories