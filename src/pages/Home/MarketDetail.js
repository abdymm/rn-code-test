/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from 'react';
import { Image, TouchableOpacity, Animated } from 'react-native';
import { Dimensions } from 'react-native';

import { ImageBackground } from 'react-native';
import { PixelRatio } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics } from '../../themes';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const DISCOUNT_TYPE_PERCENTAGE = 'percentage';
const DISCOUNT_TYPE_AMOUNT = 'amount';

const baseBorderRadius = 8;
const baseAspectRatio = 4 / 3;

export default function index({ navigation, route }) {
  const [item, setItem] = useState(route.params.item);
  const toGbpFormat = integer => {
    return integer.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  const renderPrice = item => {
    const discountType = item.discount_type;
    const discount = item.discount;
    let oriPrice = item.price;
    let finalPrice = item.price;
    if (discountType === DISCOUNT_TYPE_PERCENTAGE) {
      finalPrice = finalPrice - finalPrice * (discount / 100);
    } else if (discountType === DISCOUNT_TYPE_AMOUNT) {
      finalPrice = finalPrice - discount;
    }

    return (
      <>
        {discount && finalPrice !== 0 && (
          <Text
            style={[
              styles.label,
              styles.price,
              {
                textDecorationLine: discount && 'line-through',
              },
            ]}>
            £{toGbpFormat(oriPrice)}
          </Text>
        )}
        <Text style={[styles.label, styles.price]}>
          {finalPrice === 0 ? 'FREE' : `£${toGbpFormat(finalPrice)}`}
        </Text>
      </>
    );
  };

  return (
    <>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons
            style={styles.icon}
            name={'arrow-back'}
            size={24}
            color={Colors.dark}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode={'cover'}
          imageStyle={{ borderRadius: baseBorderRadius }}
          source={{ uri: item.image }}
        />
        <View style={styles.infoContainer}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, styles.name]}>{item.name}</Text>
            {renderPrice(item)}
            <Text style={[styles.label, styles.desc]}>
              {item.short_description}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    aspectRatio: baseAspectRatio,
    borderRadius: baseBorderRadius,
    backgroundColor: Colors.mute,
    marginRight: Metrics.doubleBaseMargin,
  },
  label: {
    color: Colors.dark,
    marginBottom: Metrics.mb,
  },
  name: {
    fontSize: Metrics.fontSize.title,
  },
  price: {
    fontSize: Metrics.fontSize.smregular,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: Metrics.fontSize.small,
  },
  imageBackground: {
    width: '100%',
    height: 'auto',
    aspectRatio: baseAspectRatio,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    padding: Metrics.pb,
    borderBottomLeftRadius: baseBorderRadius,
    borderBottomRightRadius: baseBorderRadius,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flex: 0.9,
    paddingRight: Metrics.pb,
  },
  iconContainer: {
    margin: Metrics.mb,
    backgroundColor: Colors.light,
    borderRadius: 50,
    padding: Metrics.pb,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  icon: {},
});
