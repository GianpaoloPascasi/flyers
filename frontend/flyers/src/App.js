import './App.css';
import { useEffect, useReducer, useState } from "react";
import Menu from './components/menu/Menu';
import TopBar from './components/top_bar/TopBar';
import FlyerContainer from './components/flyer/flyer_container/FlyerContainer';
import { uiInitializer, uiReducer, UI_DISPATCH_TYPES } from './reducers/ui/Ui';
import { flyersInitialer, flyersReducer, FLYERS_DISPATCH_TYPES, LS_SAVE_FLYER_KEY } from './reducers/flyers/Flyers';
import { Alert } from 'react-bootstrap';
import Loading from './components/loading/Loading';
import { getFlyers } from './endpoints';
import { handleErrors } from './utils';

const App = () => {

  /**
   * Il reducer "ui" è quello che si occupa della gestione dello stato dell'interfaccia (modali, caricamenti, stato paginazione);
   * Il reducer "flyers" si occupa di gestire i dati dei volantini (sia quello da remoto che quelli salvati sul localStorage)
   */
  const [uiState, uiDispatcher] = useReducer(uiReducer, null, uiInitializer);
  const [flyersState, flyersDispatcher] = useReducer(flyersReducer, null, flyersInitialer);
  const [lastPageRendered, setLastpageRendered] = useState(null);
  const [swipeState, setSwipeState] = useState({
    startX: 0,
    startY: 0,
    startTime: 0
  });

  /**
   * lazyloading dei volantini
   **/
  const onCanLazyLoadFlyers = e => {
    const rowContentHeight = e.target.children[0].clientHeight;
    const currentPosition = e.target.scrollTop;
    if (rowContentHeight / 4 > rowContentHeight - currentPosition) {
      uiDispatcher({
        type: UI_DISPATCH_TYPES.FORWARD_PAGE
      });
    }
  };

  /**
   * swipe per apertura menu laterale
   */
  const onCheckSwipe = (e) => {
    if (e.type === "touchstart") {
      setSwipeState({
        ...swipeState,
        startY: e.changedTouches[0].screenY,
        startX: e.changedTouches[0].screenX,
        startTime: Date.now()
      });
    } else if (e.type === "touchend") {
      const endX = e.changedTouches[0].screenX;
      const diffX = endX - swipeState.startX;
      const diffT = Date.now() - swipeState.startTime;
      if (diffT < 500 && ((diffX < -100 && uiState.isMenuShown) || (diffX > 100 && !uiState.isMenuShown))) {
        uiDispatcher({
          type: UI_DISPATCH_TYPES.TOGGLE_MENU,
        });
      }
    }
  }

  /**
   * I seguenti useEffect servono:
   
   * - per gestire il caricamento dei voltantini (sia quello iniziale che durante la navigazione);
   * - per il salvataggio dei volantini preferiti;
   * - per nascondere l'elemento che mostra l'errore qualora ci fosse.
   */

  useEffect(() => {
    if (lastPageRendered === null || (lastPageRendered < uiState.page && flyersState.numFlyers > flyersState.flyers.length)) {

      uiDispatcher({
        type: UI_DISPATCH_TYPES.TOGGLE_LOADING,
        payload: true
      });

      getFlyers(uiState.page, uiState.limit).then(handleErrors).then(res => res.json()).then(response => {
        setLastpageRendered(uiState.page);
        flyersDispatcher({
          type: FLYERS_DISPATCH_TYPES.PUSH_FLYERS_FROM_BE,
          payload: {
            flyers: response.data.flyers,
            numFlyers: response.data.numFlyers
          }
        });
      }).catch(e => flyersDispatcher({
        type: FLYERS_DISPATCH_TYPES.UPDATE_ERROR,
        payload: e.msg ? e.msg : e.message
      })).finally(() =>
        uiDispatcher({
          type: UI_DISPATCH_TYPES.TOGGLE_LOADING,
          payload: false
        }));

    }
  }, [uiState.page, uiState.limit, lastPageRendered, flyersState.flyers.length, flyersState.numFlyers]);

  useEffect(() => {

    const found = localStorage.getItem(LS_SAVE_FLYER_KEY);
    if (found) {
      localStorage.setItem(LS_SAVE_FLYER_KEY, JSON.stringify(flyersState.savedFlyers));
    } else {
      console.warn("No localstorage instance found to save flyers!");
    }

  }, [flyersState.savedFlyers]);

  useEffect(() => {
    if (uiState.error) {
      setTimeout(() => uiDispatcher({
        type: UI_DISPATCH_TYPES.UPDATE_ERROR,
        payload: null
      }), 5000);
    } else if (flyersState.error) {
      setTimeout(() => flyersDispatcher({
        type: FLYERS_DISPATCH_TYPES.UPDATE_ERROR,
        payload: null
      }), 5000);
    }
  }, [flyersState.error, uiState.error])

  return (
    <div className="h-100 mh-100 d-flex flex-column" onTouchStart={e => onCheckSwipe(e)} onTouchEnd={e => onCheckSwipe(e)}>
      {
        uiState.error || flyersState.error ?
          <Alert variant="danger m-1" className="w-100 mt-90-vh" style={{ "position": "absolute", "zIndex": "3" }}>
            {uiState.error || flyersState.error}
          </Alert>
          :
          null
      }

      {
        uiState.isLoading ? <Loading isLoading={uiState.isLoading} /> : ""
      }

      <TopBar
        onToggleMenu={() => uiDispatcher({ type: UI_DISPATCH_TYPES.TOGGLE_MENU })} />
      <Menu
        isMenuShown={uiState.isMenuShown}
        items={flyersState.savedFlyers}
        selectedFlyerId={uiState.selectedFlyerId}
        onToggleMenu={() => uiDispatcher({ type: UI_DISPATCH_TYPES.TOGGLE_MENU })}
        onSelectFlyer={(flyer) => uiDispatcher({ type: UI_DISPATCH_TYPES.SELECT_FLYER_FROM_MENU, payload: flyer })} />
      <FlyerContainer flyers={flyersState.flyers} sevedFlyers={flyersState.savedFlyers} onSaveFlyer={(flyer) => flyersDispatcher({ type: FLYERS_DISPATCH_TYPES.SAVE_FLYER, payload: flyer })} onCanLazyLoadFlyers={e => onCanLazyLoadFlyers(e)} />

    </div>
  );
}

export default App;
