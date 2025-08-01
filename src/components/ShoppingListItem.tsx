import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";
import { currencyFormatter } from "../utils";
import { ShoppingListItemFragment$key } from "./__generated__/ShoppingListItemFragment.graphql";

const ShoppingListItemFragment = graphql`
  fragment ShoppingListItemFragment on ShoppingItem {
    id
    inventoryItem {
      id
      name
    }
    quantity
    totalPrice
  }
`;

interface ShoppingListItemProps {
  item: ShoppingListItemFragment$key;
  onDelete: () => void;
  onUpdate: (newQuantity: number) => void;
  deleteButtonIsDisabled: boolean;
  pickerIsDisabled: boolean;
}

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
  },
  top: { flex: 1, flexDirection: "row" },
  bottom: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 4,
  },
  nameContainer: {
    flex: 1
  },
  name: {
    fontSize: 20,
    wordWrap: "wrap",
  },
  deleteButton: {
    textDecorationLine: "underline",
  },
});

const pickerItems = Array.from({ length: 21 }, (_value, index) => index);

export default function ShoppingListItem({
  item,
  onDelete,
  onUpdate,
  deleteButtonIsDisabled = false,
  pickerIsDisabled = false,
}: ShoppingListItemProps) {
  const data = useFragment(ShoppingListItemFragment, item);
  const { inventoryItem, totalPrice, quantity } = data;
  const [selectedQuantity, setSelectedQuantity] = useState(quantity ?? 0);
  const formattedPrice = currencyFormatter.format(totalPrice ?? 0);
  const name = inventoryItem.name;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>

        <View>
          <Picker
            enabled={!pickerIsDisabled}
            selectedValue={selectedQuantity}
            onValueChange={(_itemValue, itemIndex) => {
              const nextSelectedQuantity = pickerItems[itemIndex];
              setSelectedQuantity(pickerItems[itemIndex]);
              onUpdate(nextSelectedQuantity);
            }}
          >
            {pickerItems.map((pickerValue) => (
              <Picker.Item
                key={pickerValue}
                label={`${pickerValue}`}
                value={pickerValue}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text>{formattedPrice}</Text>
        <Pressable disabled={deleteButtonIsDisabled} onPress={() => onDelete()}>
          <Text style={styles.deleteButton}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}
