import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { faker } from '@faker-js/faker';
import { MotiView } from 'moti';

import leftArrow from './assets/left.png';
import leftToBar from './assets/left-to-bar.png';
import horizontalCenter from './assets/horizontal-center.png';
import rightArrow from './assets/right.png';
import rightToBar from './assets/right-to-bar.png';

const MAX_SIZE = 10;

faker.seed(MAX_SIZE);

const data = [...Array(MAX_SIZE).keys()].map(() => ({
  key: faker.string.uuid(),
  job: faker.animal.crocodilia(),
}));

const COLORS = {
  active: '#fcd259ff',
  inactive: '#fcd25933',
};

const SPACING = 12;

export default function App() {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  const { width } = useWindowDimensions();

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition,
      viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : SPACING,
    });
  }, [index, viewPosition]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingLeft: SPACING }}
        data={data}
        horizontal
        keyExtractor={item => item.key}
        initialScrollIndex={index}
        ref={flatListRef}
        renderItem={({ item, index: fIndex }) => (
          <TouchableOpacity
            onPress={() => {
              setIndex(fIndex);
            }}>
            <MotiView
              animate={{
                backgroundColor:
                  index === fIndex ? COLORS.active : COLORS.inactive,
                opacity: index !== fIndex ? 0.5 : 1,
              }}
              transition={{ duration: 1000 }}
              style={{
                marginRight: SPACING,
                padding: SPACING,
                borderWidth: 2,
                borderColor: COLORS.active,
                borderRadius: SPACING,
              }}>
              <Text style={{ color: '#36303f', fontWeight: '700' }}>
                {item.job}
              </Text>
            </MotiView>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      />
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: SPACING * 10,
          }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#36303f',
                fontWeight: '700',
                marginBottom: SPACING,
              }}>
              Scroll Position
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: width / 2,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setViewPosition(0);
                }}>
                <View
                  style={{
                    padding: SPACING,
                    backgroundColor: '#FCD259',
                    borderRadius: SPACING,
                    marginRight: SPACING,
                  }}>
                  <Image style={{ height: 20, width: 20 }} source={leftToBar} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setViewPosition(0.5);
                }}>
                <View
                  style={{
                    padding: SPACING,
                    backgroundColor: '#FCD259',
                    borderRadius: SPACING,
                    marginRight: SPACING,
                  }}>
                  <Image
                    style={{ height: 24, width: 24 }}
                    source={horizontalCenter}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setViewPosition(1);
                }}>
                <View
                  style={{
                    padding: SPACING,
                    backgroundColor: '#FCD259',
                    borderRadius: SPACING,
                    marginRight: SPACING,
                  }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={rightToBar}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: SPACING * 10,
          }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#36303f',
                fontWeight: '700',
                marginBottom: SPACING,
              }}>
              Navigation
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: width / 2,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (index === 0) return;
                  setIndex(index - 1);
                }}>
                <View
                  style={{
                    padding: SPACING,
                    backgroundColor: '#FCD259',
                    borderRadius: SPACING,
                    marginRight: SPACING,
                  }}>
                  <Image style={{ height: 20, width: 20 }} source={leftArrow} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (index === MAX_SIZE - 1) return;
                  setIndex(index + 1);
                }}>
                <View
                  style={{
                    padding: SPACING,
                    backgroundColor: '#FCD259',
                    borderRadius: SPACING,
                    marginRight: SPACING,
                  }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={rightArrow}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
