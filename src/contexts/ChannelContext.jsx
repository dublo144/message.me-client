import React from 'react';

const ChannelStateContext = React.createContext();
const ChannelDispatchContext = React.createContext();

const initialState = {
  channels: [],
  selectedChannel: null,
  subscribeToMore: null,
  conversations: [],
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload.loading
      };
    }
    case 'GET_USER_DATA_SUCCESS': {
      return {
        ...state,
        channels: action.payload.channels,
        conversations: action.payload.conversations
      };
    }
    case 'GET_USER_DATA_ERROR': {
      return {
        ...state,
        error: action.payload.error
      };
    }
    case 'SELECT_CHANNEL_SUCCESS': {
      return {
        ...state,
        selectedChannel: action.payload.selectedChannel,
        subscribeToMore: action.payload.subscribeToMore
      };
    }
    case 'SELECT_CHANNEL_ERROR': {
      return {
        ...state,
        error: action.payload.error
      };
    }
    case 'CREATE_CHANNEL_SUCCESS': {
      return {
        ...state,
        channels: [...state.channels, action.payload.createdChannel]
      };
    }
    case 'DELETE_CHANNEL_SUCCESS': {
      return {
        ...state,
        channels: state.channels.filter(
          (c) => c.id !== action.payload.channelId
        ),
        selectedChannel: undefined
      };
    }
    case 'SELECT_CONVERSATION_SUCCESS': {
      return {
        ...state,
        selectedChannel: action.payload.selectedChannel
      };
    }
    case 'SELECT_CONVERSATION_ERROR': {
      return {
        ...state,
        error: action.payload.error
      };
    }
    case 'NEW_MESSAGE': {
      return {
        ...state,
        selectedChannel: {
          ...state.selectedChannel,
          messages: [
            ...state.selectedChannel.messages,
            action.payload.newMessage
          ]
        }
      };
    }

    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const ChannelProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <ChannelDispatchContext.Provider value={dispatch}>
      <ChannelStateContext.Provider value={state}>
        {children}
      </ChannelStateContext.Provider>
    </ChannelDispatchContext.Provider>
  );
};

const useChannelState = () => {
  const context = React.useContext(ChannelStateContext);
  if (context === undefined) {
    throw new Error('useChannelState must be used within a ChannelProvider');
  }
  return context;
};

const useChannelDispatch = () => {
  const context = React.useContext(ChannelDispatchContext);
  if (context === undefined) {
    throw new Error('useChannelDispatch must be used within a ChannelProvider');
  }
  return context;
};

export { ChannelProvider, useChannelState, useChannelDispatch };
