import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'

function PhotoCard (props){
    if(props.listType === 'list'){
          return(
            <View style = { styles.container }>
              <View style>
                <Image
                  style={styles.imageInList}
                  source={{uri:props.imageURL}}
                />
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
              </View>
            </View>
        )
    }else {
        return(
          <View style = { styles.container }>
            <View style = {{ width: '100%', height: 200}}>
              <Image
                style = { styles.imageStyleItems }
                source={{uri:props.imageURL}}
              />
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            </View>
          </View>
      )
    }
    
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: 'white',
      paddingLeft: 5,
      paddingTop: 5,
      paddingRight: 5,
      paddingBottom: 10,
      flex: 1,
    },
    imageInList: {
        height: 150, 
        width: '100%'
    }, 
    title: {
        fontSize: 18, 
        color: 'black',
    }, 
    description: {
        fontSize: 18, 
        color: 'orange'
    },
  imageStyleItems: {
    width: '100%',
    height: '80%',
    borderRadius: 1,
},
})

export default PhotoCard