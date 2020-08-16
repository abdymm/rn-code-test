import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Metrics } from '../../themes';
import Product from '../../components/Product/index';
import { FlatList } from 'react-native';

const PRODUCTS = require('../../../assets/products.json');

export default function Market() {
  const renderItem = ({ item }) => <Product item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Market</Text>
      </View>
      <View style={styles.productContainer}>
        <FlatList
          style={styles.productList}
          data={PRODUCTS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
    fontSize: Metrics.fontSize.title,
  },
  productContainer: {},
  productList: {
    padding: Metrics.smallPadding,
  },
});
