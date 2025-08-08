import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Palette } from "../constants";
import { currencyFormatter } from "../utils";
import type { InventoryItemFragment$key } from "./__generated__/InventoryItemFragment.graphql";

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

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    wordWrap: "wrap",
    flex: 1,
    flexDirection: "row",
  },
  price: {
    fontWeight: 700,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    maxWidth: 400,
    backgroundColor: Palette.LIST_ITEM_BACKGROUND_COLOR,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.LIST_ITEM_BORDER_COLOR,
  },
  containerSelected: {
    borderColor: Palette.ACCENT_COLOR,
    borderWidth: 2,
    borderStyle: "solid",
  },
});

export default function InventoryItem({
  item,
  onSelect,
  isSelected = false,
}: InventoryItemProps) {
  const data = useFragment(InventoryItemFragment, item);

  const formattedPrice = currencyFormatter.format(data.price ?? 0);
  const subContainerStyle = {
    ...styles.subContainer,
    ...(isSelected ? styles.containerSelected : {}),
  };
  return (
    <View style={styles.container}>
      <Pressable style={subContainerStyle} onPress={() => onSelect(data.id)}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <Text>{data.category}</Text>
      </Pressable>
    </View>
  );
}
