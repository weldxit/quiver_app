import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Share,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-virtualized-view";
import * as Animatable from "react-native-animatable";

const ArticlePage = ({ navigation }) => {
  //states
  const [article, setArticle] = useState(null);

  //functions
  const updateArticle = async () => {
    const article = {
      body: `ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ`,
      id: 1,
      title:
        "ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ",
      userId: 1,
    };
    console.log(article);
    setArticle(article);
  };
  //hooks
  useEffect(() => {
    updateArticle();
  }, []);
  const articleContent =
    "Your article content goes here. https://youtu.be/SsBZmtmzyU8?si=4rkZ_cmtWh2jPDbR";
  const link = "https://youtu.be/SsBZmtmzyU8?si=4rkZ_cmtWh2jPDbR";

  const ShareIt = useCallback(async () => {
    try {
      const result = await Share.share({
        message: articleContent,
        url: link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }, [articleContent, link]);

  //components

  const MemoizedPopularItemToday = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => console.log("okkkk")}
      >
        <View style={styles.thumbTimeStamp}>
          <Image
            source={item.thumbnail}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.timeago}>Oct - 31 - 2023</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.titleContainer}>
            <Text
              style={styles.cardTitle}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.slug}
            </Text>
            <Text style={styles.cardDescip} numberOfLines={3}>
              {item.content}
            </Text>
            <Text style={styles.cardCategory}>Politics</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  //data
  const obj = [
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ । ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th2.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th3.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th4.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th6.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th6.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th6.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th6.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th6.jpg"),
    },
    {
      slug: "ରାଜ୍ୟ ବିଜେପି ମାରିଛି ଫୁସ୍‌କା ବାଣ ।",
      timestamp: "2 hour ago",
      content:
        "ଟିକେ ନଜର ପକାଇବା ବିଜେପି ନେତା ତଥା ରାଜ୍ୟ ବିରୋଧୀ ଦଳ ନେତା ଜୟନରୟଣ ମିଶ୍ରଙ୍କ କଥା ଉପରେ । ନିକଟରେ ବିଜେପି ରାଜ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ବସିଥିଲା ବୈଠକ । ରଣନୀତି ପ୍ରସ୍ତୁତ ହେଲା । ଧାର୍ଯ୍ୟ କରାଗଲା ବିଜେଡିକୁ ଏଥର ରାଜ୍ୟରୁ ହଟାଯିବ । ସବୁ ରାଜ୍ୟ ପୁରୁଖାମାନେ ବସି ରଣନୀତି ପ୍ରସ୍ତୁତ କରିଦେଲେ । କହିଲେ ୨୩ବର୍ଷ ଧରି ରାଜ୍ୟ ସରକାର କରୁଥିବା ଦୁର୍ନୀତି ଓ ବେଆଇନ କାମକୁ ଦଳ ତାଲିକା କରିଛି । ସେସବୁ ତାଲିକାକୁ ନେଇ ଦଳ ପକ୍ଷରୁ ଏକ ଚାର୍ଜସିଟ କରାଯିବ । ୧୦୮ଟି ଦୁର୍ନୀତିକୁ ନେଇ ବିଜେପି ଚାର୍ଜସିଟ ",
      thumbnail: require("../assets/thumbs/th6.jpg"),
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View
          style={styles.titleContainer1}
          animation={"fadeInDown"}
          duration={1000}
        >
          <Text style={styles.title}>{article?.title}</Text>
        </Animatable.View>
        <Animatable.View animation={"bounceInUp"} duration={500}>
          <View style={styles.stamps}>
            <Text style={styles.stamptext}>30 October 2023</Text>
            <Text style={styles.stamptext}>
              <Image
                source={require("../assets/icon/pin.png")}
                style={styles.locationpin}
              />
              Kendrapara
            </Text>
            <View>
              <Text
                style={[
                  styles.stamptext,
                  { color: "#ff0000", opacity: 1, fontWeight: "700" },
                ]}
              >
                #{"Politics"}
              </Text>
            </View>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={[styles.image]}
          />

          <View style={styles.courtesytag}>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  opacity: 0.5,
                  fontSize: responsiveFontSize(1.5),
                }}
              >
                Courtesy
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: responsiveFontSize(1.9),
                }}
              >
                The Quiver
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  opacity: 0.5,
                  fontSize: responsiveFontSize(1.5),
                }}
              >
                Author
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: responsiveFontSize(1.9),
                }}
              >
                Chinmay Pati
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => ShareIt()}>
                {/* <Text
                style={{
                  textAlign: "center",
                  opacity: 0.5,
                  fontSize: responsiveFontSize(1.5),
                }}
              >
                Share
              </Text> */}
                <Image
                  source={require("../assets/icon/share.png")}
                  style={styles.shareImage}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Animatable.View
            style={styles.contentContainer}
            animation={"fadeInDown"}
            delay={500}
          >
            <Animatable.Text style={styles.content}>
              {article?.body}
            </Animatable.Text>
          </Animatable.View>
        </Animatable.View>
        {/* <Button title='share' onPress={()=>{console.log('clicked')}} style={{zIndex:2}}/>
         */}
        <Text
          style={{
            marginHorizontal: responsiveWidth(1.5),
            fontSize: responsiveFontSize(2.2),
            marginVertical: responsiveHeight(1.5),
            fontWeight: "500",
          }}
        >
          Also read
        </Text>

        <View style={styles.viewMoreContainer}>
          <FlatList
            data={obj}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<></>}
            renderItem={({ item }) => <MemoizedPopularItemToday item={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: responsiveHeight(30),
    resizeMode: "cover",
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    // padding: 20,
    marginHorizontal: responsiveWidth(1.4),
    // borderBottomWidth:1,
    // borderBottomColor:'black'
  },
  titleContainer1: {
    // marginTop: 200, // Adjust this value to ensure proper spacing between the image and the title
    // alignItems: "center",
    marginTop: responsiveHeight(2),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "justify",
  },
  content: {
    fontSize: responsiveFontSize(2.4),
    textAlign: "justify",
    marginTop:responsiveHeight(1.5)
    // marginBottom:responsiveHeight(1.5),
    // alignSelf:'center'
  },
  stamps: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveWidth(1),
  },
  stamptext: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "400",
    opacity: 0.5,
  },
  locationpin: {
    height: 15,
    width: 10,
    marginHorizontal: responsiveWidth(1),
  },
  courtesytag: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: responsiveWidth(1.5),
    marginHorizontal: responsiveWidth(1.5),
    // backgroundColor:'pink',
    height: responsiveHeight(6),
    alignItems: "center",
  },
  shareImage: {
    height: responsiveHeight(5),
    width: responsiveWidth(7.5),
    // alignSelf: "center",
    resizeMode: "contain",
  },
  viewMoreContainer: {
    marginHorizontal: responsiveWidth(1.5),
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",
    width: responsiveWidth(94),
    height: responsiveHeight(13),
    // marginHorizontal: responsiveWidth(1),
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
    elevation: 1.5,
  },
  cardContent: {
    justifyContent: "space-between",
  },
  titleContainer: {
    width: responsiveWidth(62),
    // backgroundColor:'red',
    // justifyContent:'space-between',
    marginLeft: responsiveWidth(0.5),
    // textAlign:'justify'
  },
  cardTitle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    // width:responsiveWidth(5),
    // flexWrap:'wrap'
  },
  cardDescip: {
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(1.7),
  },
  cardCategory: {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
    // alignSelf:'flex-end'
  },
  timestamp: {
    alignSelf: "flex-end",
    marginRight: responsiveWidth(1),
  },
  cardImage: {
    height: responsiveHeight(10),
    width: responsiveWidth(30),
    borderRadius: 5,
  },
  timeago: {
    // marginBottom:10
    fontSize: responsiveFontSize(1.5),
    marginLeft: responsiveWidth(1),

    // paddingBottom:20
  },
  thumbTimeStamp: {
    justifyContent: "space-around",
  },
});

export default React.memo(ArticlePage);
