function InfoTooltip({ isOpen, onClose, data }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__confirm">
        <img className="popup__status-icon" src={data.image} alt={data.text} />
        <h2 className="popup__status-message">{data.text}</h2>
        <button
          className="popup__close-icon"
          type="button"
          title="Закрыть"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
