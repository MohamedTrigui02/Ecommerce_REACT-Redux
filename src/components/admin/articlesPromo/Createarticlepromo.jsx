import React, { useState } from 'react';
import {toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import {  createArticlePromo } from '../../../features/articlePromoSlice';
import {getScategories} from "../../../features/scategorieSlice";
import { useEffect } from 'react';
import axios from "axios"
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {useDispatch,useSelector} from "react-redux";
registerPlugin(FilePondPluginImageExifOrientation,FilePondPluginImagePreview)
const Createarticlepromo = () => {
  const [files, setFiles] = useState([]);
const[articlepromo,setArticlePromo]=useState({})
const [validated, setValidated] = useState(false);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const dispatch = useDispatch();
const {scategories,isLoading} = useSelector((state) =>state.storescategories);
useEffect(() => {
    dispatch(getScategories());
    },[dispatch]);

const handlechange=(e)=>{
    setArticlePromo({...articlepromo,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
    
    //faire le add dans la BD
    dispatch(createArticlePromo(articlepromo))
    .then(res => {
        console.log("Insert OK",res);
        toast("Article ajouté", {
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
    setArticlePromo({})
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
    setArticlePromo({...articlepromo,imageart:data.url}) ;
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
 <h3>Créer un article en : </h3> <h2> <b> PROMOTION</b> </h2>
</Modal.Header>
<Modal.Body>
<div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Référence *</Form.Label>
<Form.Control
required
type="text"
placeholder="Référence"
name="reference"
value={articlepromo.reference}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir Référence Article
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Désignation *</Form.Label>
<Form.Control
required
type="text"
name="designation"
placeholder="Désignation"
value={articlepromo.designation}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir Désignation
</Form.Control.Feedback>
</Form.Group>
</Row>
<Row className="mb-2">
<Form.Group className="col-md-6">
<Form.Label>Marque *</Form.Label>
<InputGroup hasValidation>
<Form.Control
type="text"
required
name="marque"
placeholder="Marque"
value={articlepromo.marque}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Marque Incorrecte
</Form.Control.Feedback>
</InputGroup>
</Form.Group>


<Form.Group as={Col} md="6">
<Form.Label>Prix </Form.Label>
<Form.Control
type="number"
placeholder="Prix"
name="newprix"
value={articlepromo.newprix}
onChange={(e)=>handlechange(e)}
/>
</Form.Group>

<Form.Group as={Col} md="6">
<Form.Label>Nouveau Prix</Form.Label>
<Form.Control
type="number"
placeholder="Prix"
name="prix"
value={articlepromo.prix}
onChange={(e)=>handlechange(e)}
/>
</Form.Group>


</Row>
<Row className="mb-3">
<Form.Group className="col-md-6 ">
<Form.Label>
Qté stock<span className="req-tag">*</span>
</Form.Label>
<Form.Control
required
type="number"
name="qtestock"
value={articlepromo.qtestock}
onChange={(e)=>handlechange(e)}
placeholder="Qté stock"
/>
<Form.Control.Feedback type="invalid">
Qté stock Incorrect
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="12">
<Form.Label>S/Catégorie</Form.Label>
<Form.Control
as="select"
type="select"
name="scategorieID"
value={articlepromo.scategorieID}
onChange={(e)=>handlechange(e)}
>
<option></option>
{scategories.map((scat)=><option key={scat._id}
value={scat._id}>{scat.nomscategorie}</option>
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

export default Createarticlepromo