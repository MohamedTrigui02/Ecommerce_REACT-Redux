import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findArticleByID } from '../../features/articleSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DetailArticle = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Récupération des paramètres d'URL
  const article = useSelector(state => state.storearticles.article); // Récupération de l'article depuis le state Redux
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    if (id) {
      dispatch(findArticleByID(id)); // Chargement de l'article par ID uniquement si l'ID est défini
    }
  }, [dispatch, id]);

  if (!article || Object.keys(article).length === 0) {
    return <div>Loading...</div>; // Affichage du chargement si l'article n'est pas encore chargé
  }

  return (
    <>
<Modal show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Détails Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={article.imageart} width={400} height={300} fluid />
          <p>
            <b>Référence : </b>
            {article.reference}
          </p>
          <p>{article.designation}</p>
          <p>
            <b>Prix: {article.prix} DT</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailArticle;
