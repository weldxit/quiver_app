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
    Modal
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
  import { ActivityIndicator, MD2Colors } from 'react-native-paper';
  import axios from "axios";
  import storage from '@react-native-firebase/storage'

//   import { useLoading } from "../Context/LoadContext";
  const height = Dimensions.get("window").height;

  const DefaultHome = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [animatedItems, setAnimatedItems] = useState([]);
    const [delay, setDelay] = useState(0);
    const [data, setData] = useState([]);
    const [chunk, setChunk] = useState(10);
    const [shimmer, setShimmer] = useState(false);
    const [loading,setLoading] = useState(false)
    const limit = 10;
    const [offset, setOffset] = useState(0)
    const [offset1, setOffset1] = useState(0)

    const getNews = useCallback(async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://server-for-quiver.onrender.com/todays_news?limit=${limit}&offset=${offset}`);
        setData((prevData) => [...prevData, response.data]);
        setOffset(offset+limit)
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }, [offset]);

    const getNewsByCategory = useCallback(async (item) => {
      setLoading(true);
      const limit = 10
      try {
        const response = await axios.get(`https://server-for-quiver.onrender.com/category/${item.id}?limit=${limit}&offset=${offset1}`);
        setData((prevData) => [...prevData, response.data]);
        setOffset1(offset1+limit)
      } catch (error) {
        console.error('Error fetching news by category:', error);
      } finally {
        setLoading(false);
      }
    }, [offset1]);

    const End = () => {
      if(activeItem !== null){
          getNewsByCategory(activeItem)
      }
     else{
      setOffset((prevOffset) => prevOffset + limit);
     }
    };
    const getImageUrl = async(image)=>{
      try {
        const reference = storage().ref(image)
        const url = await reference.getDownloadURL();
        return url;
      } catch (error) {
        console.error('Error retrieving image:', error);
        return null;
      }
    }
    useEffect(() => {
      getNews();
    }, [getNews]);

    useEffect(()=>{
      getNews();
    },[offset])
  
   
    const tags = [
      {id:1,name:"Politics"},
      {id:2,name:"Business"},
      {id:3,name:"Education"},
      {id:4,name:"Farming"},
      {id:5,name:"Health & lifestyle"},
      {id:6,name:"Sports"},
      {id:7,name:"State"},
      {id:8,name:"National"},
      {id:9,name:"International"},
    ];
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    const filterPress = useCallback(
       (item) => {
         setActiveItem(item);
         setData([])
        getNewsByCategory(activeItem)
        
      },
      [activeItem]
    );
  
    const renderArticle = useCallback((item) => {
        
       navigation.navigate("Singlearticle",{item});
      
    }, []);
    // small component to be separated later
    const MemoizedFlatListFilter = React.memo(({ item }) => {
      console.log("re-renderign-filter");
      return (
        <TouchableOpacity
          onPress={() => filterPress(item.id)}
          style={[
            styles.filtercontainer,
            { backgroundColor: activeItem === item.id ? "white" : "red", borderWidth: activeItem === item.id ? 1 : 0, borderColor: activeItem === item.id ? 'red' : 'none' }
          ]}
        >
          <Text style={[styles.filtertag,{color : activeItem === item.id ? "red" : "white", fontSize:responsiveFontSize(2.5), fontWeight:'bold'}]}>{item.name}</Text>
        </TouchableOpacity>
      );
    },[activeItem]);
  
    // to render latest today
    const MemoizedPopularItemToday = React.memo(({ item, index }) => {
      console.log("rendrerd-re-render-6");
      
      return (
        <Animatable.View
          style={styles.cardContent}
          animation="fadeIn"
          duration={1000}
          delay={index * 100}
        >
          <TouchableOpacity
            // style={styles.cardContainer}
            onPress={useCallback(() => {setLoading(true);renderArticle()}, [])}
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
                    source={{uri:getImageUrl(item.image)}}
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
                  getNews();
                }}
              />
            }
          >
            {/* <ActivityIndicator animating={true} color={MD2Colors.red800} /> */}
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
                    
              {!loading ? (
                <FlatList
                  data={data}
                  maxToRenderPerBatch={10}
                  initialNumToRender={20}
                  onEndReached={() => {
                    End();
                  }}
                  onEndReachedThreshold={0.3}
                  keyExtractor={(item, index) => index.toString()}
                  // ItemSeparatorComponent={() => {
                  //   return (
                  //     <View style={{ height: 1, backgroundColor: "gray" }} />
                  //   );
                  // }}
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
                    source={require("../assets/logo/qvr.gif")}
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
      borderBottomWidth:3,
      borderBottomColor:'#ff5151'
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
  