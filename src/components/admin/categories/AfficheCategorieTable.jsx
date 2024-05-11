import React,{useMemo, useState} from 'react'
import ReactLoading from 'react-loading';
import {useDispatch, useSelector} from "react-redux"
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import { delCategorie } from '../../../features/categorieSlice';
import { toast } from 'react-toastify';
import Editcategories from './Editcategories';

const AfficheCategorieTable = () => {
  const dispatch=useDispatch()
  const [showModal, setShowModal] = useState(false);
  const[categorie,setcategorie]=useState(null)

const {categories,isLoading,error} = useSelector((state)=>state.storecategories);

const handleClose= () => {
  setShowModal(false);
  setcategorie(null);
  }
  

  const handleDelete=(id,nom)=>{
    if(window.confirm("supprimer categorie O/N")) {
    dispatch(delCategorie(id));
    toast(`categorie ${nom} Supprimé`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })
    }
    }

const handleEdit = (item) => {
setShowModal(true);
setcategorie(item);
};




const columns = useMemo(
  () => [
  {
  accessorKey: 'imagecategorie', //access nested data with dot notation
  header: 'IMAGE',
  Cell: ({ cell}) => (
  <Box
  sx={{
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  }}
  >
  <img
  alt=""
  height={60}
  src={cell.getValue()}
  loading="lazy"
  style={{ borderRadius: '20%' }}
  />
  
  
  </Box>),
  },
  {
  accessorKey: 'nomcategorie', //access nested data with dot notation
  header: 'NOM DE LA CATEGORIE',
  size: 100,
  },
  
  {
    accessorKey: '_id',
    header: 'actions',
    size: 100,
    Cell: ({ cell, row }) => (
    <div >
    <Button
    onClick={() => handleEdit(cell.row.original)}
    size="md"
    className="text-warning btn-link edit"
    >
    <i class="fa-solid fa-pen-to-square"></i>
    </Button>
    <Button
                onClick={(e) => {
                handleDelete(cell.row.original._id,cell.row.original.nomcategorie);}}
                size="md"
                className="text-danger btn-link delete"
                >
                <i className="fa fa-trash" />
                </Button>
    
    </div>
    ),
    },
    
    ],

  [categories],
  );
  if (isLoading) return <center><ReactLoading type='spokes' color="red"
  height={'8%'} width={'8%'} /></center>
  if (error) return <p>Impossible d'afficher la liste des categories...</p>
  
return (
  <>
  <div>
    <MaterialReactTable columns={columns} data={categories} />
    </div>
    {showModal && (
<Editcategories
show={showModal}
handleClose={handleClose}
cat={categorie}
/>
)}

  </>
)
}
export default AfficheCategorieTable
