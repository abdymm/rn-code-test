import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { PixelRatio } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics } from '../../themes';

const DISCOUNT_TYPE_PERCENTAGE = 'percentage';
const DISCOUNT_TYPE_AMOUNT = 'amount';

const baseBorderRadius = 8;
const baseAspectRatio = 4 / 3;

export default function index({ item }) {
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
  useEffect(() => {
    console.log('item', item);
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={'cover'}
        imageStyle={{ borderRadius: baseBorderRadius }}
        source={{ uri: item.image }}>
        <View style={styles.infoContainer}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, styles.name]}>{item.name}</Text>
            {renderPrice(item)}
            <Text style={[styles.label, styles.desc]}>
              {item.short_description}
            </Text>
          </View>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: item.image }} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    aspectRatio: baseAspectRatio,
    borderRadius: baseBorderRadius,
    backgroundColor: Colors.mute,
    marginBottom: Metrics.doubleBaseMargin,
  },
  label: {
    color: Colors.light,
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
    backgroundColor: 'rgba(40,40,40,0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flex: 0.9,
    paddingRight: Metrics.pb,
  },
  avatarContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: Metrics.medBorder,
    width: 28,
    height: 28,
  },
});
