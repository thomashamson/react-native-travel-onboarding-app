import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

// Constants
import {images, theme} from '../../constants';
const {onboarding1, onboarding2, onboarding3} = images;

// Theme
const {COLORS, FONTS, SIZES} = theme;

// Dummy data
const onboardings = [
  {
    title: "Let's Travelling",
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding1,
  },
  {
    title: 'Navigation',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding2,
  },
  {
    title: 'Destination',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding3,
  },
];

const Onboarding = () => {
  const [completed, setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    // To check if user has finished scrolling the onboarding pages
    scrollX.addListener(({value}) => {
      console.log(Math.floor(value / SIZES.width));
      // console.log(onboardings.length - 1);
      if (Math.floor(value / SIZES.width) + 1 === onboardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  // Render
  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onboardings.map((item, index) => (
          <View key={index} style={{width: SIZES.width}}>
            {/* Image */}
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 120,
              }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
              />
            </View>

            {/* Text */}
            <View
              style={{
                position: 'absolute',
                bottom: '10%',
                left: 40,
                right: 40,
              }}>
              <Text
                style={{...FONTS.h1, color: COLORS.gray, textAlign: 'center'}}>
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: 'center',
                  marginTop: SIZES.base,
                  color: COLORS.gray,
                }}>
                {item.description}
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 130,
                height: 60,
                paddingLeft: 30,
                justifyContent: 'center',
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: COLORS.blue,
              }}
              onPress={() => console.log('Button on pressed')}>
              <Text style={{...FONTS.h2, color: COLORS.white}}>
                {completed ? "Let's Go" : 'Skip'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {onboardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[
                styles.dot,
                {width: dotSize, height: dotSize},
              ]}></Animated.View>
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '30%' : '30%',
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});

export default Onboarding;
