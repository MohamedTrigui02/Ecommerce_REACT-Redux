import React, { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import {useDispatch,useSelector} from "react-redux";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { updateScategorie } from '../../../features/ScategorieSlice';
import { getCategories } from '../../../features/categorieSlice';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Editscategories=({show,handleClose,scat})=> {
  const dispatch = useDispatch();
   const [scategorie,setscategorie]=useState(scat)
  const [files, setFiles] = useState([]);
 const [validated, setValidated] = useState(false);
 const {categories} = useSelector((state) =>state.storecategories);

useEffect(() => {

  if(categories.length==0){

    dispatch(getCategories())
    }
  

  setFiles( [
    {
      source: scategorie.imagescat,
      options: { type: 'local' }
    }
    ])

}, [dispatch])


const handlechange=(e)=>{
  
    setscategorie({...scategorie,[e.target.name]:e.target.value})
  }

const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  
  if (form.checkValidity() === true) {
    // Faire l'ajout dans la base de données ou autre opération nécessaire
    dispatch(updateScategorie(scategorie));
    
   setFiles([]);
    handleClose();
    setValidated(false);// pas d'erreur dans les champs
  } else {
    setValidated(true);
  }
};
    

  
    const serverOptions = () => { console.log('server pond');
    return {
      
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function(response) {
          response.blob().then(function(myBlob) {
            load(myBlob);
          });
        });
      },

      process: (fieldName, file, metadata, load, error, progress, abort) => {
          console.log(file)
        const data = new FormData();
        
        data.append('file', file);
        data.append('upload_preset', 'esps2024');
        data.append('cloud_name', 'de6mllwc6');
        data.append('public_id', file.name);
  
        axios.post('https://api.cloudinary.com/v1_1/de6mllwc6/image/upload', data)
        .then((response) => response.data)
          .then((data) => {
            
           setscategorie({...scategorie,imagescat:data.url}) ;
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

 <Button
 onClick={show}
 variant="danger"
 size="md"
 className="text-danger btn-link warning"
 >
<i class="fa-solid fa-pen-to-square"></i>

</Button>
<Modal show={show} onHide={handleClose}>
 <Form noValidate validated={validated} onSubmit={handleSubmit}>
<Modal.Header closeButton>
 <h2>Modifier une sous-categorie</h2>
</Modal.Header>
<Modal.Body>
<div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >NOM de S-CATEGORIE *</Form.Label>
<Form.Control
required
type="text"
placeholder="nom scatgorie"
name="nomscategorie"
value={scategorie.nomscategorie}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir le nom de la s-categorie
</Form.Control.Feedback>
</Form.Group>
</Row>





<Form.Group as={Col} md="6">
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
onClick={()=>handleClose()}>Annuler</Button>
</Modal.Footer>
</Form>
</Modal>
</div>
  )

}

export default Editscategories

