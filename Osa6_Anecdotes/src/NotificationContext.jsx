import { createContext, useReducer, useContext} from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_NOTIFICATION":
        return {
            ...state,
            notification: action.payload,
        };
        case "HIDE_NOTIFICATION":
        return {
            ...state,
            notification: null,
        };
        default:
        return state;
    }
}

const NotificationContext = createContext();

// eslint-disable-next-line react/prop-types
export const NotificationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, { notification: null })

    const showNotification = (message) => {
        dispatch({ type: 'SHOW_NOTIFICATION', payload: message });
        setTimeout(() => {
          dispatch({ type: 'HIDE_NOTIFICATION' });
        }, 5000)
    }

    const hideNotification = () => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
    }

    return (
        <NotificationContext.Provider value={{ notification: state.notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    const { notification, showNotification, hideNotification } = context;
    return { notification, showNotification, hideNotification };
}
    
export default NotificationContext; 