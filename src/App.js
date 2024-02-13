import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Alert,
  BackHandler,
  NativeModules,
  Platform
} from 'react-native';
import CityFarmWebView from './screens/CityFarmWebView'
const { AppFinishModule } = NativeModules;



const App = () => {
  const isDarkMode = useColorScheme() === "dark";


  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <CityFarmWebView
          handleClose={() => {
            Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
              {
                text: '아니오',
                onPress: () => null,
              },
              {
                text: '예', onPress: () => {
                  if (Platform.OS == 'android') {
                  } AppFinishModule.finish()
                }
              },
            ]);
          }} />
      </SafeAreaView>
    </>

  );

};
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});


export default App;

