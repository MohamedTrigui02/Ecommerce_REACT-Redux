import React,{useMemo, useState} from 'react'
import ReactLoading from 'react-loading';
import {useDispatch, useSelector} from "react-redux"
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { delCarousel } from '../../../features/carouselSlice';
import { Button } from 'react-bootstrap';
import Editcarousel from './Editcarousel';
import { toast } from 'react-toastify';

const AfficheCarouselTable = () => {
const dispatch=useDispatch()
const [showModal, setShowModal] = useState(false);
const {carousels,isLoading,error} = useSelector((state)=>state.storecarousel);
const [carousel, setCarousel] = useState(null);
const handleClose= () => {
setShowModal(false);
setCarousel(null);
}
const dellCarousel=(id,nom)=>{
    if(window.confirm("supprimer carousel  O/N")) {
    dispatch(delCarousel(id));
    toast(`image  ${nom} Supprimé`, {
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
setCarousel(item);
};





const columns = useMemo(
  () => [
  {
  accessorKey: 'imagecarousel', //access nested data with dot notation
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
  accessorKey: 'nomcarousel', //access nested data with dot notation
  header: 'NOM DE LA carousel',
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
                  dellCarousel(cell.row.original._id,cell.row.original.nomcarousel);}}
                size="md"
                className="text-danger btn-link delete"
                >
                <i className="fa fa-trash" />
                </Button>
    
    </div>
    ),
    },
    
    ],
    [carousel],
    );
    if (isLoading) return <center><ReactLoading type='spokes' color="red"
    height={'8%'} width={'8%'} /></center>
    if (error) return <p>Impossible d'afficher la liste de carousel</p>
    
    return (
    <>
    <div>
        <MaterialReactTable columns={columns} data={carousels} />
    </div>
    {showModal && (
    <Editcarousel
    show={showModal}
    handleClose={handleClose}
    car={carousel}
    />
    )}
    </>
    )
    }
    export default AfficheCarouselTable