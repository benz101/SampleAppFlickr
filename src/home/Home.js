import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { searchPhotos } from '../helper/FlickerApi'
import PhotoCard from './PhotoCard'


function Home() {
  const [photos, setPhotos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listType, setListType] = useState('');
  const [message, setMessage] = useState('Please enter your keyword and click search');

  const search = (keyword) => {
    setIsLoading(true);
    searchPhotos(keyword)
      .then(results => {
        console.log('there are ' + results.length + ' photos')
        setPhotos(results);
        setIsLoading(false);
        setListType('list');
      })
  }

  const searchButtonPressed = () => {
    if (searchText !== '') {
      search(searchText);
      setMessage('');
      console.log(searchText);
    } else {
      alert('Keyword cannot be empty')
    }
  }

  const onChangeListType = () => {
    (listType === 'list')
      ? setListType('grid')
      : setListType('list')
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 50, flexDirection: 'row', backgroundColor: 'white' }}>
          <View style={{ flex: 5 }}>
            <TextInput
              style={styles.input}
              placeholder='Enter Your Keyword...'
              clearButtonMode='while-editing'
              textAlign={'center'}
              autoCapitalize='none'
              autoCorrect={false}
              // onChangeText={(text) => this.setState({ text: text })}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ebebeb', }}
            onPress={onChangeListType}>
            {
              (listType === 'list')
                ? <Text style={{ fontSize: 18, textAlign: 'center' }}>Grid Mode</Text>
                : <Text style={{ fontSize: 18, textAlign: 'center' }}>List Mode</Text>
            }
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          style={styles.button}
          underlayColor='white'
          onPress={searchButtonPressed}>
          <View>
            <Text style={styles.buttonText}>Search</Text>
          </View>
        </TouchableHighlight>
        <View style={{ backgroundColor: 'grey', flex: 1 }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            {message}
          </Text>
          {
            (listType === 'grid')
              ?
              <FlatList
                data={photos}
                numColumns={2}
                key={listType === 'grid' ? 2 : 1}
                contentContainerStyle={{ alignItems: 'stretch' }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PhotoCard
                  listType={listType}
                  style={{ margin: 20 }}
                  imageURL={item.url_m}
                  title={item.title}
                  description={item.description._content}
                />}
              />
              :

              <FlatList
                data={photos}
                numColumns={1}
                key={listType === 'grid' ? 2 : 1}
                contentContainerStyle={{ alignItems: 'stretch' }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PhotoCard
                  listType={listType}
                  style={{ margin: 20 }}
                  imageURL={item.url_m}
                  title={item.title}
                  description={item.description._content}
                />}
              />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  item: {
    fontSize: 25,
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: 47,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
  }
});

export default Home;
