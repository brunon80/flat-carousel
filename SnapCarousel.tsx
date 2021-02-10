import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  StyleProp,
  ViewStyle
} from 'react-native';
import Carousel from 'react-native-snap-carousel'

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator.jpeg',
  'https://cdn.dribbble.com/users/3281732/screenshots/10940512/media/b2a8ea95c550e5f09d0ca07682a3c0da.jpg'
]

const { width, height } = Dimensions.get('screen')

const ITEM_WIDTH = width * 0.8
const ITEM_HEIGHT = height * 0.45

const SnapCarousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const ref = useRef<Carousel<string>>(null)

  function _renderItem ({item, index}: { item: string, index: number }) {  
    const inputRange = data.map((_, dataIndex) => (index - ((data.length - Math.ceil(data.length /  2)) - dataIndex)) * ITEM_WIDTH)
    const outputRange = data.map((_, dataIndex) => {
      if (dataIndex === Math.floor(data.length /  2)) {
        return ITEM_HEIGHT * 1.2
      } 
      return ITEM_HEIGHT
    })

    const interpolatedHeight = scrollX.interpolate({
      inputRange,
      outputRange
    })

    return (
        <Animated.View style={[styles.cardWrapper, { height: interpolatedHeight }]}>
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
               }}>
                {`BOTTOM ${index}`}
            </Text>
        </Animated.View>
    )
}

  return (
    <View style={styles.container}>
      <Carousel
          ref={ref}
          data={data}
          layout="default"
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={ITEM_WIDTH}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          keyExtractor={(_, index) => index.toString()}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          slideStyle={{ alignSelf: 'center' }}
        />
    </View>
  )
}

export default SnapCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardWrapper: {
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  image: {
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: 6,
    width: '100%',
    height: '100%'
  }
});
