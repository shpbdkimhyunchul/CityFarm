import React, { useEffect, useState, useRef, } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Animated,
  ScrollView,
  RefreshControl,
  NativeModules,
  BackHandler,
  Image,
  Platform,
  SafeAreaView,
  Alert,
  AppState,
  Linking,
  Appearance,
  useColorScheme,
  StatusBar
} from 'react-native';

import { WebView } from 'react-native-webview';
import LoadingBar from '../components/Loading'
import SplashScreen from "react-native-splash-screen";

const { ToastModule } = NativeModules;

const BASE_URL = 'https://www.naver.com';

let loadingComplete = false;



const CityFarmWebView = ({ handleClose }) => {
  const webViewRef = useRef(null);
  const [goBackable, setGoBackable] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [enablePTR, setEnablePTR] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme(); // 'dark', 'light', 또는 'no-preference'
  const [statusBarBackColor, setStatusBarBackColor] = useState('#006db9');
  const [statusBarColor, setStatusBarColor] = useState('light-content');


  useEffect(() => {
    if (colorScheme === 'dark') {
      StatusBar.setBarStyle('dark-content'); // 다크 모드에서 밝은 텍스트 색상
  }
    setStatusBarColor('dark-content');
    setStatusBarBackColor('#ffffff');


    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {

        if (webViewRef.current && goBackable) {
          webViewRef.current.goBack();
        }
        else {
          handleClose();
        }
        return true;
      },
    );
    return () => backHandler.remove();
  }, [goBackable]);


  useEffect(() => {

    console.log('--------startsplashImage-------------------');
    const splash = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);  //스플래시 스크린 활성화 시간 (1초)

    if (webViewRef && webViewRef.clearCache) webViewRef.clearCache();
    return () => clearTimeout(splash);

  }, [webViewRef]);

    

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    webViewRef.current.reload();
    setRefreshing(false);
  }, [refreshing]);

  const handleEvent = e => {
    if (e.nativeEvent.contentOffset.y > 100) {
      setEnablePTR(false);
    } else {
      setEnablePTR(true);
    }
  };

  const handleWebViewLoad = () => {

    console.log('handleLoad');
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 300);

  };

  const handleLoadStart = (res) => {
    console.log('handleLoadStart');
    console.log('shpbd_platform = ' + Platform.OS);
    if (Platform.OS === 'ios') {
     
        setLoading(true);
        loadingComplete = false;
        setTimeout(() => {
          if (!loadingComplete) {
            setLoading(true);
          }
        }, 500);
     
    }

  };

  const handleLoadEnd = () => {
    console.log('handleLoadEnd');
    if (Platform.OS === 'ios') {
 
        loadingComplete = true;
        setLoading(false);
      
    }
  };


  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        style={styles.ScrollStyle}
        contentContainerStyle={{ flex: 1 }}
        scrollEventThrottle={160}

        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            enabled={enablePTR}

          />
        }>
        {/* <Button
      title='fffff'
      onPress={()=> ToastModule.show("heelog",1)}
      /> */}
        {
          Platform.OS === 'android'
            ?
            <>
              <SafeAreaView style={{
                // backgroundColor: '#006db9'
                backgroundColor: { statusBarBackColor }
              }} />
              {/* <StatusBar backgroundColor='#006db9' barStyle={'light-content'} /> */}
              <StatusBar backgroundColor={statusBarBackColor} barStyle={statusBarColor} />
            </>
            :
            <>
              <SafeAreaView
                edges={["top"]}
                // style={{ flex: 0, backgroundColor: "#006db9", barStyle:'light-content'}}
                style={{ flex: 0, backgroundColor: statusBarBackColor, barStyle: statusBarColor }}
              />
              <StatusBar backgroundColor={statusBarBackColor} barStyle={statusBarColor} />
            </>
        }



        {loading && (
          <View style={styles.container}>
            <Image style={styles.loadingImage} source={require('../../assets/images/loading.gif')} />
          </View>
        )}

        <WebView
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onLoad={handleWebViewLoad}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          source={{ uri: BASE_URL }}
          setSupportMultipleWindows={true}
          allowsInlineMediaPlayback={true}
          mixedContentMode={'compatibility'}
          originWhitelist={['https://*', 'http://*']}
          overScrollMode={'never'}
          ref={webViewRef}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          automaticallyAdjustContentInsets={false}
          allowFileAccess={true}
          onNavigationStateChange={({ canGoBack }) => { setGoBackable(canGoBack) }}
          onScroll={(event) => handleEvent(event)}
          onLoadProgress={({ nativeEvent }) => {
            console.log("shpbd===" + nativeEvent.canGoBack)

            setGoBackable(nativeEvent.canGoBack)
        }}

          onMessage={(event) => {
            const url = event.nativeEvent.data;
            console.log("shpbd====" + url)
            // setGoBackable(url !== BASE_URL);
            console.log('shpbd_onMessage===', event.nativeEvent.data);
          }}
          // renderLoading={() => {
          //   <LoadingBar/>
          // }}

          injectedJavaScript={`
        (function() {
            function wrap(fn) {
            return function wrapper() {
                var res = fn.apply(this, arguments);
                window.ReactNativeWebView.postMessage(window.location.href);
                return res;
            }
            }
            history.pushState = wrap(history.pushState);
            history.replaceState = wrap(history.replaceState);
            window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage(window.location.href);
            });
        })();
        true;
        `}
        />
      </ScrollView>

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  ScrollStyle: {
    backgroundColor: 'white',
    position: 'relative',
  }
});

export default CityFarmWebView;
