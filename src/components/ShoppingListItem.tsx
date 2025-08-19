import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";
import { currencyFormatter } from "../utils";
import { ShoppingListItemFragment$key } from "./__generated__/ShoppingListItemFragment.graphql";
import { FontFamily, Palette } from "../constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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

const pickerItems = Array.from({ length: 20 }, (_value, index) => index + 1);

export default function ShoppingListItem({
  item,
  onDelete,
  onUpdate,
  deleteButtonIsDisabled = false,
  pickerIsDisabled = false,
}: ShoppingListItemProps) {
  const data = useFragment(ShoppingListItemFragment, item);
  const { inventoryItem, totalPrice, quantity } = data;
  const [selectedQuantity, setSelectedQuantity] = useState(quantity ?? 1);
  const formattedPrice = currencyFormatter.format(totalPrice ?? 0);
  const name = inventoryItem.name;
  const [isHoveringDeleteButton, setIsHoveringDeleteButton] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.top}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>

          <View>
            <Text style={styles.price}>{formattedPrice}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <Picker
            enabled={!pickerIsDisabled}
            selectedValue={selectedQuantity}
            onValueChange={(_itemValue, itemIndex) => {
              const nextSelectedQuantity = pickerItems[itemIndex];
              setSelectedQuantity(pickerItems[itemIndex]);
              onUpdate(nextSelectedQuantity);
            }}
            style={styles.picker}
          >
            {pickerItems.map((pickerValue) => (
              <Picker.Item
                key={pickerValue}
                label={`${pickerValue}`}
                value={pickerValue}
              />
            ))}
          </Picker>
          <Pressable
            disabled={deleteButtonIsDisabled}
            onPress={() => onDelete()}
            onHoverIn={() => setIsHoveringDeleteButton(true)}
            onHoverOut={() => setIsHoveringDeleteButton(false)}
          >
            <FontAwesome6 name="trash" size={24} color={isHoveringDeleteButton ? "red" : "black"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  top: { flex: 1, flexDirection: "row" },
  bottom: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 16,
  },
  nameContainer: {
    flex: 1,
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
  picker: {
    width: 60,
  },
});
