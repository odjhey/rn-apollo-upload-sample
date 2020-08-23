import React, {Fragment} from 'react';
import {Card, Button, Text} from 'react-native-elements';
import {observer} from 'mobx-react';
import {useMst} from '../store';

import {ReactNativeFile, createUploadLink} from 'apollo-upload-client';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const Header = observer(() => {
  const store = useMst();
  const save = () => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      //@ts-ignore
      link: createUploadLink({
        uri: 'http://localhost:4000/graphql/',
      }),
    });
    const file = new ReactNativeFile({
      uri: store.uri,
      name: 'asdlfj.png',
      type: 'image/png',
    });
    console.log('--file---', file);

    client
      .mutate({
        mutation: gql`
          mutation up($file: Upload!) {
            singleUpload(file: $file) {
              filename
              mimetype
              encoding
            }
          }
        `,
        variables: {
          file: file,
        },
      })
      .then((d) => {
        console.log('apollo result', d);
      })
      .catch((e) => {
        console.log('apollo result', e);
      });
  };
  return (
    <Card
      title={
        <Fragment>
          <Text>Hello World!</Text>
          <Text>uri: {store.uri}</Text>
          <Text>sign: {store.signUri}</Text>
        </Fragment>
      }>
      <Button
        raised={true}
        title={'save'}
        onPress={() => {
          save();
        }}></Button>
    </Card>
  );
});

export default Header;
