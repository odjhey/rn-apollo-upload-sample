import React, {useState} from 'react';
import {ScrollView, View, Image, ToastAndroid} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {Text, Card, Button} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePickerView from './src/components/ImagePicker';
import StoreComponent from './src/components/StoreTestComponent';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const App = () => {
  const [state, setState] = useState({photos: [] as Array<any>});
  const _handleButtonPress = () => {
    if (Platform.OS === 'android') {
      hasAndroidPermission()
        .then((d) => {
          if (!d) {
            ToastAndroid.show(
              'Please allow App to access your files',
              ToastAndroid.SHORT,
            );
            return;
          }
          CameraRoll.getPhotos({
            first: 5,
            assetType: 'Photos',
          })
            .then((r) => {
              setState(() => ({photos: r.edges}));
            })
            .catch((err) => {
              console.log(err);
              ToastAndroid.show(err.toString(), ToastAndroid.LONG);
            });
        })
        .catch((e) => {
          ToastAndroid.show(e.toString(), ToastAndroid.LONG);
        });
    } else {
      console.log('IOS not supported.');
    }
  };

  return (
    <StoreComponent>
      <View style={{flex: 1}}>
        <Card>
          <Text>Hello World!</Text>
        </Card>
        <ScrollView>
          <View>
            <ImagePickerView></ImagePickerView>
          </View>
          <View>
            <Button
              title="Load Images"
              onPress={() => {
                _handleButtonPress();
              }}
            />
            <View style={{maxHeight: 300}}>
              <ScrollView nestedScrollEnabled={true}>
                {state.photos.map((p: any, i) => {
                  return (
                    <Image
                      key={i}
                      style={{
                        width: 300,
                        height: 100,
                      }}
                      source={{uri: p.node.image.uri}}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </StoreComponent>
  );
};

export default App;
