import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-web';

const perfilApi = `https://api.github.com/users/RuanLucasGD`;
const repoApi = `https://api.github.com/users/RuanLucasGD/repos`;

var repoData = []
var userData = []

export default function App() {

  const [userDataReceived, setUserDataReceived] = useState(false)
  const [repoDataReceived, setRepoDataReceived] = useState(false)

  function requestApiDataPromise(uri) {

    return new Promise(function (resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(request.response);
        } else {
          reject({
            status: request.status,
            statusText: request.statusText,
          });
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      };
      request.open('GET', uri, true);
      request.send();
    })
  }

  function openPerfil() {

    requestApiDataPromise(perfilApi).then((data) => {
      userData = JSON.parse(data);
      setUserDataReceived(true)
    });
  }

  function openRepo() {

    requestApiDataPromise(repoApi).then((data) => {
      repoData = JSON.parse(data);
      setRepoDataReceived(true)
    })
  }

  useEffect(() => {
    openPerfil();
    openRepo();
  }); 4

  if (repoDataReceived) {
    console.log(repoData)
  }

  if (userDataReceived) {
    console.log(userData)
  }

  const repoList = [];

  function formatRepoName(repoName) {

    var newName = repoName;
    newName = newName.toUpperCase();
    return newName;
  }

  for (let r of repoData) {

    repoList.push(
      <View style={styles.RepoBox}>
        <View style={styles.FieldsStyle}>
          <Text style={styles.RepoName}>{formatRepoName(r.name)}</Text>
          <View style={{ height: 2, backgroundColor: "#dee2e6", paddingLeft: 50 }}></View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.NormalText}>{r.visibility}</Text>
            <Text style={styles.BoldText}>{r.fork ? "fork: true" : "fork: false"}</Text>
            <Button key={"Press"} style={{height:10000}}></Button>
          </View>
        </View>
      </View>
    )
  }

  return (
    < View style={styles.container} >
      <View style={styles.Center}>
        <View style={styles.Box}>
          <Image style={styles.AvatarImg} source={{ uri: userData.avatar_url }} />
          <Text key={userData.name} style={styles.Name}> {userData.name} </Text>
          <Text style={styles.Bio}> {userData.bio} </Text>
          <Text style={styles.Bio}> Followers {userData.followers} </Text>
        </View>
        <ul>{repoList}</ul>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({

  container: {
    padding: '5%',
    display: 'flex',
    flex: 1,
    backgroundColor: '#212529',
    alignItems: 'center'
  },
  FieldsStyle: {
    backgroundColor: "#343a40",
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderColor: "#caf0f8",
  },
  AvatarImg: {
    paddingBottom: 100,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  Name: {
    fontSize: 50,
    color: "#fff",
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  Bio: {
    fontSize: 20,
    color: "#fff",
    fontStyle: 'italic',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  RepoName: {
    fontSize: 15,
    color: "#fff",
    fontWeight: 'bold',
    textAlign: 'left'
  },
  NormalText: {
    fontSize: 15,
    color: "#ced4da",
    textAlign: 'left'
  },
  ItalicText: {
    fontSize: 15,
    color: "#ced4da",
    fontStyle: "italic",
    textAlign: 'left'
  },
  BoldText: {
    fontSize: 15,
    color: "#ced4da",
    fontWeight: "bold",
    textAlign: 'left'
  },
  Button: {
    heiht: 500,
    width: 200,
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
    margin: 20,
    backgroundColor: "#343a40"
  },
  ButtonFont: {
    fontSize: 20
  },
  Center: {
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  RepoBox: {
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
  }
});
