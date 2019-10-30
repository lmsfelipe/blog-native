import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);

  return (
    <View>
      <BlogPostForm
        navigation={navigation}
        onSubmit={(title, content) => {
          addBlogPost({ title, content }, () =>
            navigation.navigate('Index'),
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default CreateScreen;
