import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

import SignatureCapture from 'react-native-signature-capture';
import {useMst} from '../store';

const Signature = () => {
  const signRef = useRef(null);
  const store = useMst();

  const saveSign = () => {
    //@ts-ignore
    signRef.current.saveImage();
  };

  const resetSign = () => {
    //@ts-ignore
    signRef.current.resetImage();
  };

  const _onSaveEvent = (result) => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    //console.log(result);
    store.setSignUri(result.pathName);
  };
  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <SignatureCapture
        style={[{flex: 1}, styles.signature]}
        ref={signRef}
        onSaveEvent={_onSaveEvent}
        onDragEvent={_onDragEvent}
        saveImageFileInExtStorage={false}
        showNativeButtons={false}
        showTitleLabel={false}
        viewMode={'portrait'}
      />

      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button
          title={'save'}
          onPress={() => {
            saveSign();
          }}></Button>
        <Button
          title={'Reset'}
          onPress={() => {
            resetSign();
          }}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
});

export default Signature;
