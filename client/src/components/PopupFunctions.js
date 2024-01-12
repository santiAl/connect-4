import Popup from 'react-popup';
import '../css/Popup.css';



export function openPopup() {
    Popup.create({
      title: 'Aviso',
      content: 'Espera a que el rival juegue.',
      className: 'waiting_move',
      buttons: {
        right: [
          {
            text: 'Cerrar',
            className: 'custom', 
            action: function () {
              Popup.close();
            },
          },
        ],
      },
    });
  }


  export function openPopupWin({returnHome,handleRemoveGame}) {
    Popup.create({
      title: 'Victoria',
      content: 'Felicitaciones.',
      className: 'Win',
      buttons: {
        right: [
          {
            text: 'Cerrar',
            className: 'custom', 
            action: function () {
              handleRemoveGame();
              Popup.close();
            },
          },
          {
            text: 'Volver a mis juegos',
            className: 'custom',
            action: function(){
              returnHome();
              handleRemoveGame();
              Popup.close();
            },
          },
        ],
      },
    });
  }

  export function openPopupDefeat({returnHome,handleRemoveGame}) {
    Popup.create({
      title: 'Derrota',
      content: 'Gracias por jugar.',
      className: 'Defeat',
      buttons: {
        right: [
          {
            text: 'Cerrar',
            className: 'custom', 
            action: function () {
              handleRemoveGame();
              Popup.close();
            },
          },
          {
            text: 'Volver a mis juegos',
            className: 'custom',
            action: function(){
              returnHome();
              handleRemoveGame();
              Popup.close();
            },
          },
        ],
      },
    });
  }