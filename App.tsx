import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Animated
} from 'react-native';

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator.jpeg',
  'https://cdn.dribbble.com/users/3281732/screenshots/10940512/media/b2a8ea95c550e5f09d0ca07682a3c0da.jpg'
]

const { width } = Dimensions.get('screen')

const imageW = width * 0.7
const imageH = imageW * 1.54

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current

  function renderBackground() {
    return data.map((image, index) => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width
      ]

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0]
      })

      return <Animated.Image
        key={`image-${index}`}
        source={{ uri: image }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity
          }
        ]}
        blurRadius={5}
      />
    })
  }

  function renderCard({ item }: { item: string }) {
    return (
      <View style={styles.cardWrapper}>
        <Image
          source={{ uri: item }}
          style={styles.image}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {renderBackground()}
      </View>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={renderCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  cardWrapper: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    elevation: 10
  },
  image: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius: 16
  }
});
