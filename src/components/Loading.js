import React from 'react';
import Styled from 'styled-components/native';
import { Alert, AppState, BackHandler, Image, Linking, Platform, StyleSheet, View, Appearance, useColorScheme, StatusBar, SafeAreaView } from "react-native";




const Loading = () => {
  return (
    <View style={styles.container}>
    <Image style={styles.loadingImage} source={require('../../assets/images/loading.gif')} />
</View>
  );
};

export default Loading;
