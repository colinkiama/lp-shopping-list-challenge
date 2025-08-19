import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { FontFamily, Palette } from "../constants";
import { currencyFormatter } from "../utils";
import type { InventoryItemFragment$key } from "./__generated__/InventoryItemFragment.graphql";
import { useState } from "react";

const InventoryItemFragment = graphql`
  fragment InventoryItemFragment on InventoryItem {
    category
    id
    name
    price
  }
`;

interface InventoryItemProps {
  item: InventoryItemFragment$key;
  onSelect: (nextId: string) => void;
  isSelected?: boolean;
}


export default function InventoryItem({
  item,
  onSelect,
  isSelected = false,
}: InventoryItemProps) {
  const data = useFragment(InventoryItemFragment, item);
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);
 
  const formattedPrice = currencyFormatter.format(data.price ?? 0);
  const subContainerStyle = {
    ...styles.subContainer,
    ...(isSelected ? styles.containerSelected : {}),
    ...(!isSelected && isHoveringContainer ? styles.containerHoveredIn : {}),
  };
  return (
    <View style={styles.container}>
      <Pressable style={subContainerStyle} 
                 onPress={() => onSelect(data.id)}
                 onHoverIn={() => setIsHoveringContainer(true)}
                 onHoverOut={() => setIsHoveringContainer(false)}>
        <View style={styles.top}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>{formattedPrice}</Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryText}>{data.category}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 24,
    wordWrap: "wrap",
    fontFamily: FontFamily.Medium,
    letterSpacing: -2,
  },
  price: {
    fontSize: 28,
    fontFamily: FontFamily.SemiBold,
    letterSpacing: -2,
  },
  category: {
    marginTop: 12,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 4
  },
  categoryText: {
    fontSize: 12,
    fontFamily: FontFamily.SemiBold,
    color: "#ffffff"
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    maxWidth: 400,
    backgroundColor: Palette.BACKGROUND_COLOR,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.BORDER_COLOR,
  },
  containerSelected: {
    borderColor: Palette.LIST_ITEM_SELECTED_BORDER_COLOR,
    borderWidth: 1,
    backgroundColor: Palette.LIST_ITEM_SELECTED_BACKGROUND_COLOR,
  },
  containerHoveredIn: {
    backgroundColor: "#DADADA"
  }
});
