import { View, Text, StyleSheet, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FontFamily, Palette } from "../constants";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CustomHeader({ options, navigation }: NativeStackHeaderProps) {
  const HeaderLeft = options.headerLeft;
  const HeaderRight = options.headerRight;
  const router = useRouter();
  const [isHoveringHeaderLeftContent, setIsHoveringHeaderLeftContent] = useState(false);

  return (
    <View style={styles.container}>
      {HeaderLeft ? (
        <Pressable 
        onHoverIn={() => setIsHoveringHeaderLeftContent(true)}
        onHoverOut={() => setIsHoveringHeaderLeftContent(false)}
        onPress={() => {
          if (router.canGoBack()) {
            router.dismissAll();
          } else {
            router.replace('/');
          }
        }}>
          <View style={styles.headerLeft}>
            <HeaderLeft tintColor={isHoveringHeaderLeftContent ? "#363636ff" : "#000000"}/>
          </View>
        </Pressable>
      ) : null}

      <Text style={styles.headerTitle}>{options.title ?? ""}</Text>
      <View style={styles.headerRight}>
        {HeaderRight ? (
        <View style={styles.headerRight}>
          <HeaderRight />
        </View>
      ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: Palette.BACKGROUND_COLOR,
  },
  headerLeft: {
    marginRight: 12,
  },
  headerTitle: {
    fontFamily: FontFamily.Bold,
    fontSize: 32,
    letterSpacing: -2,
    flex: 1,
  },
  headerRight: {
    marginLeft: 12,
  },
});
