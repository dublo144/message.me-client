import { gql } from '@apollo/client';

const SIGN_IN = gql`
  query SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      userId
      username
      token
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($input: UserInput!) {
    signUp(UserInput: $input) {
      username
    }
  }
`;

const USER_DATA = gql`
  query {
    userData {
      channels {
        id
        name
      }
      conversations {
        id
        name
      }
    }
  }
`;

const CHANNEL_DETAILS = gql`
  query ChannelDetails($input: String!) {
    channelDetails(channelId: $input) {
      id
      name
      description
      admins {
        _id
      }
      messages {
        id
        user {
          username
        }
        content
        date
        likes
        dislikes
      }
    }
  }
`;

const CHANNELS = gql`
  query Channels {
    channels {
      id
      name
    }
  }
`;

const CREATE_CHANNEL = gql`
  mutation CreateChannel($input: ChannelInput!) {
    createChannel(ChannelInput: $input) {
      id
      name
      description
    }
  }
`;

const DELETE_CHANNEL = gql`
  mutation DeleteChannel($channelId: ID!) {
    deleteChannel(channelId: $channelId) {
      id
      name
    }
  }
`;

const CONVERSATIONS = gql`
  query Conversations {
    conversations {
      id
      name
    }
  }
`;

const CONVERSATION_DETAILS = gql`
  query ConversationDetails($input: ID!) {
    conversationDetails(conversationId: $input) {
      id
      name
      description
      messages {
        id
        user {
          firstName
          lastName
          username
        }
        content
        date
      }
    }
  }
`;

const MESSAGE = gql`
  mutation NewMessage($channelId: ID!, $content: String!) {
    newMessage(channelId: $channelId, content: $content) {
      id
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription Message($channelId: ID!) {
    message(channelId: $channelId) {
      id
      user {
        username
      }
      content
      date
      likes
      dislikes
    }
  }
`;

const USER_SEARCH = gql`
  query UserSearch($email: String) {
    users(email: $email) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const queries = {
  SIGN_IN,
  SIGN_UP,
  USER_DATA,
  CHANNEL_DETAILS,
  CHANNELS,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  CONVERSATIONS,
  CONVERSATION_DETAILS,
  MESSAGE,
  MESSAGE_SUBSCRIPTION,
  USER_SEARCH
};
