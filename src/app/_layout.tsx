import { Link, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, FetchFunction, Network } from "relay-runtime";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UsedInventoryItemsContext } from "../context/UsedInventoryItemsContext";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { Palette } from "../constants";

const HTTP_ENDPOINT = "http://localhost:8000/";

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  });
  if (!resp.ok) {
    throw new Error("Response failed.");
  }
  return await resp.json();
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Inter-Regular": require("../../assets/fonts/Inter-Regular.otf"),
    "Inter-Medium": require("../../assets/fonts/Inter-Medium.otf"),
    "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.otf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.otf"),
    ...FontAwesome6.font,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const [usedItemIds, setUsedItemIds] = useState<string[]>([]);
  const [isHoveringAddButton, setIsHoveringAddButton] = useState(false);

  if (!loaded && !error) {
    return null;
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      <UsedInventoryItemsContext
        value={{
          updateUsedItemIds: (nextUsedItemIds) => {
            setUsedItemIds(nextUsedItemIds);
          },
          usedItemIds: usedItemIds,
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              contentStyle: styles.stackContentStyle,
              header: (props) => <CustomHeader {...props} />,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Shopping List",
                headerRight: (props) => (
                  <Pressable
                    onHoverIn={() => setIsHoveringAddButton(true)}
                    onHoverOut={() => setIsHoveringAddButton(false)}
                  >
                    <Link style={{...styles.addButton, ...(isHoveringAddButton ? styles.addButtonHoveredIn : null)}} href="/Inventory">
                      <FontAwesome6 name="plus" size={20} color="black" />
                    </Link>
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="Inventory/index"
              options={{
                title: "Add Item",
                headerLeft: (props) => (
                  <FontAwesome6 name="arrow-left" size={32} color={props.tintColor} />
                ),
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </UsedInventoryItemsContext>
    </RelayEnvironmentProvider>
  );
}

const styles = StyleSheet.create({
  stackContentStyle: {
    backgroundColor: Palette.BACKGROUND_COLOR,
  },
  addButton: {
    display: "flex",
    fontWeight: 700,
    backgroundColor: Palette.ACCENT_COLOR,
    color: "#ffffff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonHoveredIn: {
    backgroundColor: "#26bb89ff"
  }
});
