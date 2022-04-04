import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FlatList } from 'react-native-web';
import { Image } from 'react-native'
import { useEffect } from 'react'

function requestApiData(api, onGetRequestData) {

  const request = new XMLHttpRequest();

  request.open('GET', api, true);

  request.onload = () => {

    const data = JSON.parse(request.response);
    if (onGetRequestData) {
      onGetRequestData(data);
    }
  }

  request.send();
}

function openPerfil() {
  console.log("bla")
}

export default function App() {

  const perfilApi = `https://api.github.com/users/RuanLucasGD`;
  const repoApi = `https://api.github.com/users/RuanLucasGD/repos`;

  var emptyWindow = (
    <View style={styles.container}>
      <Text style={styles.item}> bla </Text>
    </View>
  );

  const [appWindow, setAppWindow] = useState(emptyWindow);
  const [userDataFinded, setUserDataFinded] = useState(false);
  const [repoDataFinded, setRepoDataFinded] = useState(false);
  let userData = {};
  let repoData = {};
  const [allDataFinded, setAllDataFinded] = useState(false)

  const checkIfAllDataIsFinded = () => { return userDataFinded && repoDataFinded; }

  const drawFullWindow = () => {

    setAppWindow((
      < View style={styles.container} >
        <View style={styles.Center}>
          <Image style={styles.AvatarImg} source={{ uri: userData.avatar_url }} />
          <Text style={styles.Name}> {userData.name} </Text>
          <Text style={styles.Bio}> {userData.bio} </Text>
          <Text>Hello</Text>
        </View>
        <View style={styles.container}>
        </View>
        <Button title="Open perfil" onPress={openPerfil} color="#ee9b00"></Button>
      </View >
    ))
  }

  requestApiData(perfilApi, (data) => {

    if (!userDataFinded) {
      userData = data;
      setUserDataFinded(true)
    }
  })

  requestApiData(repoApi, (data) => {

    if (!repoDataFinded) {
      setRepoDataFinded(true)
      repoData = data;
    }
  })


  useEffect(() => {

    if (!allDataFinded) {


      if (checkIfAllDataIsFinded()) {
        drawFullWindow()
        setAllDataFinded(true)
        console.log(repoData) 
      }
    }
  })

  return appWindow;
}

const styles = StyleSheet.create({

  container: {
    padding: '5%',
    display: 'flex',
    flex: 1,
    backgroundColor: '#0c1e2b',
    alignItems: 'center'
  },
  AvatarImg: {
    paddingBottom: 100,
    width: 200,
    height: 200,
    borderRadius: 200 / 2
  },
  Name: {
    fontSize: 50,
    color: "#fff",
    fontWeight: 'bold'
  },
  Bio: {
    fontSize: 20,
    color: "#fff",
    fontStyle: 'italic'
  },
  Button: {
    heiht: 50,
    width: 200,
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
    margin: 20
  },
  Center: {
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  }
});
