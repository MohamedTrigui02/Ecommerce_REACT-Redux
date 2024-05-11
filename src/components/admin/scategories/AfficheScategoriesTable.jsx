import React,{useMemo, useState} from 'react'
import ReactLoading from 'react-loading';
import {useDispatch, useSelector} from "react-redux"
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Editscategories from './Editscategories';
import { deleteScategorie } from '../../../features/ScategorieSlice';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AfficheScategorieTable = () => {
  const dispatch=useDispatch()
  const [showModal, setShowModal] = useState(false);
const {scategories,isLoading,error} = useSelector((state)=>state.storescategories);
const[scategorie,setscategorie]=useState(null)
const handleClose= () => {
  setShowModal(false);
  setscategorie(null);
  }
  

  const handleDelete=(id,nom)=>{
    if(window.confirm("supprimer scategorie O/N")) {
    dispatch(deleteScategorie(id));
    toast(`s-categorie ${nom} Supprimé`, {
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
setscategorie(item);
};





const columns = useMemo(
  () => [
  {
  accessorKey: 'imagescat', //access nested data with dot notation
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
  alt="555"
  height={60}
  src={cell.getValue()}
  loading="lazy"
  style={{ borderRadius: '20%' }}
  />
  
  
  </Box>),
  },
  {
  accessorKey: 'nomscategorie', //access nested data with dot notation
  header: 'NOM DE LA sous-CATEGORIE',
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
                handleDelete(cell.row.original._id,cell.row.original.nomscategorie);}}
                size="md"
                className="text-danger btn-link delete"
                >
                <i className="fa fa-trash" />
                </Button>
    
    </div>
    ),
    },
    
    ],
  [scategories],
  );
  if (isLoading) return <center><ReactLoading type='spokes' color="red"
  height={'8%'} width={'8%'} /></center>
  if (error) return <p>Impossible d'afficher la liste des scategories...</p>
  
return (
  <>
  <div>
    <MaterialReactTable columns={columns} data={scategories} />
    </div>
{showModal && (
<Editscategories
show={showModal}
handleClose={handleClose}
scat={scategorie}
/>
)}
  </>
)
}
export default AfficheScategorieTable
