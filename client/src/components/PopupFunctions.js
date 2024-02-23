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


  export function openPopupWin({returnHome}) {
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
              Popup.close();
            },
          },
          {
            text: 'Volver a mis juegos',
            className: 'custom',
            action: function(){
              returnHome();
              Popup.close();
            },
          },
        ],
      },
    });
  }

  export function openPopupDefeat({returnHome}) {
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
              Popup.close();
            },
          },
          {
            text: 'Volver a mis juegos',
            className: 'custom',
            action: function(){
              returnHome();
              Popup.close();
            },
          },
        ],
      },
    });
  }


  export function openPopupConnection({refresh}) {
    Popup.create({
      title: 'Aviso',
      content: 'Hubo un problema con la conexion.',
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
          {
            text: 'Refrescar.',
            className: 'custom',
            action: function(){
              refresh();
              Popup.close();
            },
          },
        ],
      },
    });
  }



