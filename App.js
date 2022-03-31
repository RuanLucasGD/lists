import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-web';

function requestUserRepository(username, onGetRequestData) {

  const request = new XMLHttpRequest();
  const githubUrl = `https://api.github.com/users/${username}`;

  request.open('GET', githubUrl, true);

  request.onload = () => {

    const data = JSON.parse(request.response);
    onGetRequestData(data);
  }

  request.send();
}

export default function App() {

  const drawList = (dt) => {
    <FlatList
      data={[dt]}
      renderItem={(item) => console.log("bla")}
    />
  }

  return (
    <View style={styles.container}>
      {
        requestUserRepository("RuanLucasGD", (data) => { drawList(data) })
      }
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    fontSize: 10,
    color: "black"
  }
});
