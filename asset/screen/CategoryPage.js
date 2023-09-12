import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExpandableComponent = ({ item, onClickFunction }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  const nav = useNavigation();

  const handleCategory = () => {
    nav.navigate('ItemDetailScreen');
  };

  return (
    <View>
      {/* Header of the Expandable List Item */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={[
          styles.header,
          {
            backgroundColor:
              item.category_name === 'Frozen' || item.category_name === 'Snack'
                ? '#5DBB63'
                : 'white',
          },
        ]}
      >
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: 'white',
          height: layoutHeight,
          overflow: 'hidden',
        }}
      >
        {/* Content under the header of the Expandable List Item */}
        {item.subcategory.map((subItem, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={handleCategory}
          >
            <Text style={styles.text}>{subItem.val}</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const CategoryPage = () => {
  const [listDataSource, setListDataSource] = useState(CONTENT);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderRadius: 5,
            borderColor: 'lightgray',
          }}
        >
          <Text style={styles.titleText}>Category</Text>
        </View>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: 'black',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
});

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Frozen',
    subcategory: [
      { id: 1, val: 'Ice Cream' },
      { id: 2, val: 'Meat' },
      // Add more subcategories as needed
    ],
  },
  {
    isExpanded: false,
    category_name: 'Snack',
    subcategory: [
      { id: 3, val: 'Chips' },
      { id: 4, val: 'Cookies' },
      // Add more subcategories as needed
    ],
  },
  // Add more categories as needed
];

export default CategoryPage;
