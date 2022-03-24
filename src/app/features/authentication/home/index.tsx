import React, {memo, useEffect, useRef} from 'react';
import isEqual from 'react-fast-compare';
import {
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ActionSheet} from '@components';

const HomeComponent = () => {
  useEffect(() => {}, []);
  const ActionSheetRef = useRef<any>();
  const onShow = () => {
    ActionSheetRef.current?.show();
  };
  // render
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onShow}>
        <Text>show action sheet</Text>
      </TouchableOpacity>
      <ActionSheet
        ref={ActionSheetRef}
        title={<Text> title</Text>}
        rootStyle={styles.modalStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 120,
    flex: 1,
  },
  modalStyle: {
    backgroundColor: 'green',
    height: 400,
    width: '100%',
  },
});
export const Home = memo(HomeComponent, isEqual);
