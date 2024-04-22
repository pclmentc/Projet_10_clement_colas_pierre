import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null); // Garder une référence à l'ID du timeout

  // Tri des événements par ordre décroissant des dates
  const byDateDesc = data && Array.isArray(data.focus) ? data.focus.slice().sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  ) : [];

  // correction de l'affichage d'un slide blanc en fin de boucle
  const nextCard = () => {
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
  };

  const handlePaginationClick = (idx) => {
    // Annuler le délai en cours
    clearTimeout(timeoutId);
    // Mettre à jour l'index
    setIndex(idx);
    // Démarrer un nouveau délai
    const newTimeoutId = nextCard();
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    if (byDateDesc && byDateDesc.length > 0) {
      // Réinitialiser le délai à chaque changement d'index
      clearTimeout(timeoutId);
      const newTimeoutId = nextCard();
      setTimeoutId(newTimeoutId);
    }
  }, [index, byDateDesc]); // Mettre à jour le timeout lorsqu'un changement d'index ou de données se produit

  // Vérifiez si byDateDesc est défini avant de mapper les slides
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => (
            <input
              key={uuidv4()}
              type="radio"
              name="pagination"
              checked={index === radioIdx}
              onClick={() => handlePaginationClick(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
