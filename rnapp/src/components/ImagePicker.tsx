import React, {useState, useEffect} from 'react';
import {ScrollView, Image, View} from 'react-native';
import {Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {useMst} from './../store';

const ImagePickerView = () => {
  const [state, setState] = useState({src: {} as any});
  const store = useMst();

  useEffect(() => {
    console.log('set uri', state.src.uri);
    store.setUri(state.src.uri);
  }, [state]);

  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    title: 'Select Photo',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const showPicker = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setState((prev) => ({
          src: source,
        }));
      }
    });
  };

  return (
    <View style={{maxHeight: 300, borderWidth: 2, borderColor: 'pink'}}>
      <ScrollView>
        <Button
          title={'Select photo'}
          onPress={() => {
            showPicker();
          }}></Button>
        <Image source={state.src} style={{height: 300}} />
      </ScrollView>
    </View>
  );
};

export default ImagePickerView;
