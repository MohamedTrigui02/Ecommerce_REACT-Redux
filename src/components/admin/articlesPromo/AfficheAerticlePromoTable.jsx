import React,{useState,useMemo} from 'react'
import ReactLoading from 'react-loading';
import {useSelector} from "react-redux"
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux";
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import EditArticlePromo from './EditArticlePromo';
import { delArticlePromo } from '../../../features/articlePromoSlice';
const AfficheAerticlePromoTable = () => {
const dispatch=useDispatch()
const [showModal, setShowModal] = useState(false);
const {articlespromo,isLoading,error} = useSelector((state)=>state.storearticlespromo);
const [articlepromo, setArticlePromo] = useState(null);
const handleClose= () => {
setShowModal(false);
setArticlePromo(null);
}
const handleDelete=(id,ref)=>{
    if(window.confirm("supprimer Article En promo O/N")) {
    dispatch(delArticlePromo(id));
    toast(`Article en promotion ${ref} Supprimé`, {
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
setArticlePromo(item);
};


const columns = useMemo(
() => [
{
accessorKey: 'imageart', //access nested data with dot notation
header: 'Image',
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
accessorKey: 'reference', //access nested data with dot notation
header: 'Référence',
size: 100,
},
{
accessorKey: 'designation',
header: 'Désignation',
size: 100,
},
{
accessorKey: 'marque', //normal accessorKey
header: 'Marque',
size: 100,
},
{
    accessorKey: 'newprix',
    header: 'Ancien Prix',
    size: 100,
    },
    {
        accessorKey: 'prix',
        header: 'Nouveau Prix',
        size: 100,
        },
        
    
{
accessorKey: 'qtestock',
header: 'Stock',
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
            handleDelete(cell.row.original._id,cell.row.original.reference);}}
            size="md"
            className="text-danger btn-link delete"
            >
            <i className="fa fa-trash" />
            </Button>

</div>
),
},

],
[articlespromo],
);
if (isLoading) return <center><ReactLoading type='spokes' color="red"
height={'8%'} width={'8%'} /></center>
if (error) return <p>Impossible d'afficher la liste des articles en promotion...</p>

return (
<>
<div>
    <MaterialReactTable columns={columns} data={articlespromo} />
</div>
{showModal && (
<EditArticlePromo
show={showModal}
handleClose={handleClose}
art={articlepromo}
/>
)}
</>
)
}
export default AfficheAerticlePromoTable