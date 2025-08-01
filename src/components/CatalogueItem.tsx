import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Palette } from "../constants";
import { currencyFormatter } from "../utils";
import type { CatalogueItemFragment$key } from "./__generated__/CatalogueItemFragment.graphql";

const CatalogueItemFragment = graphql`
  fragment CatalogueItemFragment on InventoryItem {
    category
    id
    name
    price
  }
`;

interface CatalogueItemProps {
  item: CatalogueItemFragment$key;
  onSelect: (nextId: string) => void;
  isSelected?: boolean;
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    wordWrap: "wrap",
  },
  price: {
    fontWeight: 700,
  },
  container: {
    minWidth: 300,
    padding: 4
  },
  containerSelected: {
    borderColor: Palette.ACCENT_COLOR,
    borderWidth: 4,
    borderStyle: "solid",
    borderRadius: 12,
  },
});


export default function CatalogueItem({
  item,
  onSelect,
  isSelected = false,
}: CatalogueItemProps) {
  const data = useFragment(CatalogueItemFragment, item);

  const formattedPrice = currencyFormatter.format(data.price ?? 0);
  const containerStyles = {
    ...styles.container,
    ...(isSelected ? styles.containerSelected : {}),
  };
  return (
    <Pressable onPress={() => onSelect(data.id)}>
      <View style={containerStyles}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <Text>{data.category}</Text>
      </View>
    </Pressable>
  );
}
