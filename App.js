import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FlatList } from 'react-native-web';
import { Image } from 'react-native'
import { useEffect } from 'react'

const perfilApi = `https://api.github.com/users/RuanLucasGD`;
const repoApi = `https://api.github.com/users/RuanLucasGD/repos`;

export default function App() {
  const [userData, setUserData] = useState({ avatar_url: '', name: '', bio: '' })

  function requestApiData(api, onGetRequestData) {
    const request = new XMLHttpRequest();

    request.onload = () => {
      const data = JSON.parse(request.response);
      if (onGetRequestData) {
        onGetRequestData(data);
      }
    }
    request.open('GET', api, true);
    request.send();
  }

  function openPerfil() {
    requestApiData(perfilApi, (data) => {
      const new_d = { avatar_url: data.avatar_url, name: data.name, bio: data.bio };
      setUserData(new_d);
    })
  }

  useEffect(() => {
    openPerfil();  
  });

  /*if (!userData.name) {
    return (
      <View style={styles.container}>
        <Button title="Open perfil" onPress={openPerfil} color="#ee9b00"></Button>
      </View>
    );
  } else {*/
    return (
      < View style={styles.container} >
        <View style={styles.Center}>
          <Image style={styles.AvatarImg} source={{ uri: userData.avatar_url }} />
          <Text key={userData.name} style={styles.Name}> {userData.name} </Text>
          <Text style={styles.Bio}> {userData.bio} </Text>
        </View>
        <View style={styles.container}>
        </View>
      </View >
    );
  //}
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
