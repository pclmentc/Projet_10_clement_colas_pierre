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
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));    
  };

  const handlePaginationClick = (idx) => {
    clearTimeout(timeoutId);
    setIndex(idx);
    const newTimeoutId = setTimeout(nextCard, 6000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    const timerId = setTimeout(nextCard, 6000);
    return () => clearTimeout(timerId);
  }, [index]);

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
              key={uuidv4()}// Utilisation de uuidv4() pour générer une clé unique
              type="radio"
              name="pagination"
              checked={index === radioIdx}
              onChange={() => handlePaginationClick(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
