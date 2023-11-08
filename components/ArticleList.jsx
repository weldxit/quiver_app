import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    RefreshControl,
  } from "react-native";
  import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
  } from "react-native-responsive-dimensions";
  import { ScrollView } from "react-native-virtualized-view";
  import * as Animatable from "react-native-animatable";
  import axios from "axios";

//   import { useLoading } from "../Context/LoadContext";
  const height = Dimensions.get("window").height;
  const DefaultHome = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const [animatedItems, setAnimatedItems] = useState([]);
    const [delay, setDelay] = useState(0);
    const [data, setData] = useState([]);
    const [chunk, setChunk] = useState(10);
    const [shimmer, setShimmer] = useState(false);
    // const { load, toggleLoad } = useLoading();
    // console.log(load)
    const getNews = async () => {
      // console.log(Date.now(), 'start')
      // setRefreshing(true)
      await axios
        .get(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => {
          setData(response.data);
          // console.log(response.data)
          // console.log(Date.now(),'end')
        });
      setShimmer(false);
      // console.log('refreshing ended')
    };
    useEffect(() => {
      getNews();
    }, []);
  
    const End = () => {
      // setChunk((prevChunk) => [...prevChunk, prevChunk.length + 10]);
      setChunk(chunk + 10);
      setShimmer(false);
    };
    const tags = [
      "#politics",
      "#education",
      "#state",
      "#farming",
      "#international",
      "#business",
      "#shreejagannath",
      "#health",
    ];
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    const filterPress = useCallback(
      async (item) => {
        // console.log('rerender')
        // console.log(item, "clicked");
        setActiveItem(item);
      },
      [setActiveItem]
    );
  
    const renderArticle = useCallback((item) => {
      // toggleLoad();
       navigation.navigate("Singlearticle", { item });
    }, []);
    // small component to be separated later
    const MemoizedFlatListFilter = React.memo(({ item }) => {
      console.log("re-renderign-filter");
      return (
        <TouchableOpacity
          onPress={() => filterPress(item)}
          style={[
            styles.filtercontainer,
            { backgroundColor: activeItem === item ? "lightblue" : "pink" },
          ]}
        >
          <Text style={styles.filtertag}>{item}</Text>
        </TouchableOpacity>
      );
    },[]);
  
    // to render latest today
    const MemoizedPopularItemToday = React.memo(({ item, index }) => {
      console.log("rendrerd-re-render-6");
  
      return (
        <Animatable.View
          style={styles.cardContent}
          animation="fadeIn"
          duration={1000}
          delay={index * 90}
        >
          <TouchableOpacity
            // style={styles.cardContainer}
            onPress={useCallback(() => renderArticle(item), [])}
          >
            <View style={styles.cardWrapper}>
              <View style={styles.slug_cat_img_wrapper}>
                <View style={styles.slug_wrapper}>
                  <Text style={styles.slug} numberOfLines={4}>
                    {item.title}
                  </Text>
                </View>
                <View style={styles.cat_img_wrapper}>
                  <Text style={styles.cat}>Politics</Text>
                  <Image
                    source={require("../assets/thumbs/th7.jpg")}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.content_wrapper}>
                <Text style={styles.content} numberOfLines={3}>
                  {item.body}
                </Text>
              </View>
              {/* <View style={styles.time_loc_stamp}>
              <Text style={styles.stamp_text}>{'\u231B'} 2 hr ago</Text>
            
            </View> */}
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
     
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  setShimmer(true);
                  getNews();
                }}
              />
            }
          >
            <View style={styles.latestArticlesContainer}>
              <View>
                <FlatList
                  data={tags}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <MemoizedFlatListFilter item={item} />
                  )}
                />
              </View>
  
              {!shimmer ? (
                <FlatList
                  data={data.slice(0, chunk)}
                  maxToRenderPerBatch={10}
                  initialNumToRender={20}
                  onEndReached={() => {
                    setShimmer(true);
                    End();
                  }}
                  onEndReachedThreshold={0.3}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={() => {
                    return (
                      <View style={{ height: 1, backgroundColor: "gray" }} />
                    );
                  }}
                  // ListEmptyComponent={<Text>hello</Text>}
                  renderItem={({ item, index }) => (
                    <MemoizedPopularItemToday item={item} index={index} />
                  )}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: height - 200,
                  }}
                >
                  <Image
                    source={require("../assets/logo/loading.gif")}
                    height={700}
                    width={300}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
          </ScrollView>
    
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: "white",
    },
    topAutoscrollBanner: {
      maxHeight: 200,
      marginHorizontal: responsiveWidth(1.5),
    },
    latestYoutube: {
      fontSize: responsiveFontSize(3),
      fontStyle: "normal",
      fontWeight: "bold",
      paddingVertical: responsiveHeight(1),
    },
    latestArticlesContainer: {
      marginTop: responsiveHeight(2),
      marginHorizontal: responsiveWidth(1.2),
      // backgroundColor: "gray",
    },
    latestHeading: {
      fontSize: responsiveFontSize(3),
      fontWeight: "bold",
      paddingVertical: responsiveHeight(1),
      marginHorizontal: responsiveHeight(0.7),
    },
    filtercontainer: {
      height: responsiveHeight(5),
      width: "auto",
      justifyContent: "center",
      marginRight: responsiveWidth(2),
      // borderRadius: responsiveWidth(10),
      borderWidth: responsiveWidth(0),
      borderRadius: 9,
    },
    filtertag: {
      textAlign: "center",
      paddingHorizontal: 5,
    },
  
    popularHead: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    popularCard: {
      backgroundColor: "white",
      width: 250,
      height: 200,
      flexDirection: "column",
      justifyContent: "flex-start",
      elevation: 4,
      marginTop: responsiveHeight(2),
      borderTopColor: "lightblue",
      // borderTopWidth:5,
      // borderTopLeftRadius:10,
      borderRadius: 10,
    },
    pCardImage: {
      width: 250,
      height: 125,
  
      // backgroundColor:'red'
    },
    pCardImageText: {
      margin: 0,
      padding: 0,
    },
    popularTagHead: {
      fontSize: responsiveFontSize(3),
      fontWeight: "bold",
    },
    popularMore: {
      fontSize: responsiveFontSize(2),
      fontWeight: "bold",
      color: "blue",
      // textDecorationStyle:'dashed'
      marginTop: 9,
    },
  
    //card
    cardContent: {
      // marginTop:responsiveHeight(3),
      // paddingHorizontal:5
      marginVertical: responsiveHeight(3),
      // backgroundColor:'red',
      // borderWidth:1,
      // borderColor:'blue'
    },
    cardWrapper: {
      height: "auto",
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: 5,
      padding: 5,
      // borderBottomWidth:1,
      // borderBottomColor:'red',
    },
    slug_cat_img_wrapper: {
      backgroundColor: "white",
      flex: 1,
      flexDirection: "row",
      // justifyContent:'space-between'
      // justifyContent:'flex-end'
      // height:responsiveHeight(15)
    },
    cat: {
      fontSize: responsiveFontSize(2),
      fontWeight: "600",
      backgroundColor: "red",
      alignSelf: "flex-end",
      borderRadius: 5,
      // padding:2
      marginBottom: 2,
      paddingHorizontal: 10,
      color: "white",
    },
    content_wrapper: {
      flex: 1,
      marginTop: responsiveHeight(1.5),
    },
    content: {
      fontSize: responsiveFontSize(2),
    },
    slug_wrapper: {
      flex: 1,
      // justifyContent:'center'
    },
    slug: {
      fontSize: responsiveFontSize(3),
      fontWeight: "bold",
      // marginTop:10,
      // textAlign:'justify'
    },
    cat_img_wrapper: {},
    image: {
      height: responsiveHeight(12),
      width: responsiveWidth(40),
      borderRadius: 5,
    },
    time_loc_stamp: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    stamp_text: {
      fontSize: responsiveFontSize(2),
      marginVertical: responsiveHeight(1.5),
      fontWeight: "500",
    },
  });
  
  export default React.memo(DefaultHome);
  