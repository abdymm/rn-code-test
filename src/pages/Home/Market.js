import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Metrics } from '../../themes';
import Product from '../../components/Product/index';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const PRODUCTS = require('../../../assets/products.json');

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default function Market({ navigation }) {
  const [isProductSelected, productSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  //set product categories
  const generateProductCategories = products => {
    const productCategories = [];
    products.forEach(product => {
      const found = productCategories.some(el => el.name === product.category);
      if (!found) {
        productCategories.push({
          name: product.category,
        });
      }
    });
    return productCategories;
  };

  //rendery category in vertical list
  const renderProductCategory = ({ item }) => {
    const productsByCategory = PRODUCTS.filter(
      product => product.category === item.name,
    );
    productsByCategory.sort((a, b) => (a.order > b.order ? 1 : -1));

    return (
      <View style={styles.categoryItem}>
        <Text style={styles.subtitle}>{item.name}</Text>

        <FlatList
          style={styles.productList}
          data={productsByCategory}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </View>
    );
  };
  //rendery product in horizontal list
  const renderProduct = ({ item }) => {
    return (
      <Product
        item={item}
        onPress={() => {
          onPressItem(item);
        }}
      />
    );
  };

  const fadeAnim = useRef(new Animated.Value(100)).current;
  const onPressItem = item => {
    fadeAnim.setValue(100);
    productSelected(true);
    setSelectedProduct(item);
    Animated.timing(fadeAnim, {
      toValue: DEVICE_WIDTH,
      duration: 1000,
    }).start();
    setTimeout(() => {
      productSelected(false);
      fadeAnim.setValue(100);
      navigation.navigate('MarketDetail', { item });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {isProductSelected && (
        <Animated.View
          style={{
            width: fadeAnim,
            height: fadeAnim,
          }}>
          <Product
            productStyle={{ width: DEVICE_WIDTH }}
            item={selectedProduct}
          />
        </Animated.View>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Market</Text>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.categoryContainer}>
          <FlatList
            style={styles.productCategoryList}
            data={generateProductCategories(PRODUCTS)}
            renderItem={renderProductCategory}
            keyExtractor={item => item.name}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
  },
  titleContainer: {
    alignItems: 'center',
    padding: Metrics.pb,
  },
  title: {
    fontSize: Metrics.fontSize.h4,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Metrics.fontSize.regular,
    fontWeight: 'bold',
  },
  categoryContainer: {
    paddingBottom: Metrics.pdb,
  },
  productCategoryList: {
    padding: Metrics.pb,
  },
  categoryItem: {
    marginBottom: Metrics.mb,
  },
  productList: {
    flex: 1,
    padding: Metrics.smallPadding,
  },
});
