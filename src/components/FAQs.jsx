// src/components/FAQs.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import './css/FAQs.css';

function FAQs() {
  const faqs = [
    { question: '¿Cuál es el horario de atención?', answer: 'Estamos abiertos todos los días de 11:00 a 22:00.' },
    { question: '¿Hacen entregas a domicilio?', answer: 'Sí, ofrecemos servicio a domicilio en toda la ciudad.' },
    { question: '¿Cuáles son los métodos de pago aceptados?', answer: 'Aceptamos Visa, Mastercard y pagos en efectivo.' },
    { question: '¿Puedo personalizar mi pedido?', answer: 'Sí, puedes personalizar tus pizzas a tu gusto.' },
    { question: '¿Tienen opciones vegetarianas?', answer: 'Sí, ofrecemos varias opciones vegetarianas en nuestro menú.' },
  ];

  const [comments, setComments] = useState([]);
  const [aliasInput, setAliasInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const snapshot = await getDocs(collection(db, 'comments'));
      const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    };

    fetchComments();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (aliasInput.trim() && commentInput.trim()) {
      try {
        const newComment = { alias: aliasInput, text: commentInput, replies: [] };
        const docRef = await addDoc(collection(db, 'comments'), newComment);
        setComments([...comments, { id: docRef.id, ...newComment }]);
        setAliasInput('');
        setCommentInput('');
      } catch (error) {
        console.error('Error al agregar comentario:', error);
      }
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (replyText.trim()) {
      const commentRef = doc(db, 'comments', commentId);
      const reply = { alias: aliasInput, text: replyText };
      try {
        await updateDoc(commentRef, {
          replies: [...(comments.find(c => c.id === commentId)?.replies || []), reply]
        });
        setComments(prevComments =>
          prevComments.map(c =>
            c.id === commentId
              ? { ...c, replies: [...(c.replies || []), reply] }
              : c
          )
        );
        setReplyText('');
      } catch (error) {
        console.error('Error al agregar respuesta:', error);
      }
    }
  };

  return (
    <section id="FAQs" className="faqs-section">
      <Helmet>
        <title>Preguntas Frecuentes - Pizza Cheese</title>
        <meta name="description" content="Encuentra las respuestas a las preguntas más frecuentes sobre Pizza Cheese. Horarios, entregas, métodos de pago y más." />
        <meta property="og:title" content="Preguntas Frecuentes - Pizza Cheese" />
        <meta property="og:description" content="Consulta las preguntas frecuentes sobre Pizza Cheese. Horarios, entregas, métodos de pago y opciones del menú." />
        <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
        <meta property="og:url" content="https://cheesepizza-gt.web.app/faqs" />
      </Helmet>
      <div className="container">
        <h2 className="faqs-title">Preguntas Frecuentes</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <h5 className="faq-question">{faq.question}</h5>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="comment-section">
          <h3 className="comment-title">Comentarios de los Usuarios</h3>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              placeholder="Tu alias"
              className="comment-input"
              required
            />
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
              className="comment-textarea"
              required
            />
            <button type="submit" className="submit-button">Enviar Comentario</button>
          </form>
          <div className="comments-list">
            {comments.map((comment) => (
              <div className="comment-item" key={comment.id}>
                <strong className="comment-author">{comment.alias}</strong>
                <p className="comment-text">{comment.text}</p>
                <div className="reply-section">
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="reply-form">
                    <input
                      type="text"
                      value={aliasInput}
                      onChange={(e) => setAliasInput(e.target.value)}
                      placeholder="Tu alias"
                      className="reply-input"
                      required
                    />
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe tu respuesta aquí..."
                      className="reply-textarea"
                      required
                    />
                    <button type="submit" className="submit-button">Responder</button>
                  </form>
                  <div className="replies-list">
                    {(comment.replies || []).map((reply, index) => (
                      <div className="reply-item" key={index}>
                        <strong className="reply-author">{reply.alias}</strong>
                        <p className="reply-text">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
