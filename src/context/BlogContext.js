import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;

    case 'add_blogpost':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];

    case 'remove_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);

    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id
          ? action.payload
          : blogPost;
      });

    default:
      return;
  }
};

const getBlogPosts = dispatch => async () => {
  try {
    const resp = await jsonServer.get('/blogpost');

    dispatch({ type: 'get_blogposts', payload: resp.data });
  } catch (error) {
    console.log('error get ===> ', error);
  }
};

const addBlogPost = () => async (payload, callBack) => {
  try {
    await jsonServer.post('/blogpost', {
      title: payload.title,
      content: payload.content,
    });

    callBack();
  } catch (error) {
    console.log('error post ===> ', error);
  }
};

const removeBlogPost = dispatch => async id => {
  try {
    await jsonServer.delete(`/blogpost/${id}`);

    dispatch({ type: 'remove_blogpost', payload: id });
  } catch (error) {
    console.log('error remove ===> ', error);
  }
};

const editBlogPost = dispatch => async (id, data, callBack) => {
  try {
    await jsonServer.put(`/blogpost/${id}`, data);

    dispatch({ type: 'edit_blogpost', payload: { id, ...data } });
    callBack();
  } catch (error) {
    console.log('error put ===> ', error);
  }
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, removeBlogPost, editBlogPost, getBlogPosts },
  [],
);
