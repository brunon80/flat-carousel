import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Animated,
  Pressable,
  FlatList, Text
} from 'react-native';

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator.jpeg',
  'https://cdn.dribbble.com/users/3281732/screenshots/10940512/media/b2a8ea95c550e5f09d0ca07682a3c0da.jpg'
]

const { width, height } = Dimensions.get('screen')

const imageW = width * 0.8
const imageH = height * 0.5
const ITEM_PADDING = 10

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const ref = React.useRef<FlatList>(null)
  const dataToRender = ['', ...data, '']

  const onItemPress = React.useCallback((itemIndex: number) => {
    ref.current?.scrollToOffset({
      offset: imageW * (itemIndex -  1)
    })
  }, [])

  function renderBackground() {
    return dataToRender.map((image, index) => {

      if (!image) {
        return null
      }

      const inputRange = [
        (index - 2) * imageW,
        (index - 1) * imageW,
        (index) * imageW
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

  function renderCard({ item, index }: { item: string, index:  number }) {

    if (!item) {
      return <View style={{ width: (width - imageW) / 2, height: height * 0.5 }} />
    }

    const inputRange = data.map((_, dataIndex) => (index - ((data.length - 1) - dataIndex)) * imageW)
    const outputRange = data.map((_, dataIndex) => {
      if (dataIndex === Math.floor(data.length /  2)) {
        return imageH * 1.2
      } 
      return imageH * 0.9
    })

    const interpolatedHeight = scrollX.interpolate({
      inputRange,
      outputRange
    })

    return (
      <Pressable onPress={() => onItemPress(index)}>
        <Animated.View style={[styles.cardWrapper, { height: interpolatedHeight, justifyContent: 'space-between' }]}>
          <Image
            source={{ uri: item }}
            style={styles.image}
            />
            <Text style={{ 
              fontSize: 25, 
              backgroundColor: 'orange', 
              paddingHorizontal: 20, 
              borderRadius: 6
               }}>
                {`TOP ${index}`}
            </Text>
            <Text style={{ 
              fontSize: 25, 
              backgroundColor: 'orange', 
              paddingHorizontal: 20, 
              borderRadius: 6
               }}>
                {`MIDDLE ${index}`}
            </Text>
            <Text style={{ 
              fontSize: 25, 
              backgroundColor: 'orange', 
              paddingHorizontal: 20, 
              borderRadius: 6,
              marginBottom: 20
               }}>
                {`BOTTOM ${index}`}
            </Text>
        </Animated.View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {renderBackground()}
      </View>
      <Animated.FlatList
        ref={ref}
        data={dataToRender}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={renderCard}
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={imageW}
        snapToAlignment='start'
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
    width: imageW,
    alignItems: 'center',
    padding: ITEM_PADDING
  },
  image: {
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: 16,
    width: '100%',
    height: '100%'
  }
});
