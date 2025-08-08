import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Palette } from "../constants";
import { currencyFormatter } from "../utils";

interface InventoryQuantityPickerProps {
  price: number;
  name?: string;
  disabled?: boolean;
  onAdd: (quantity: number) => void;
}
const pickerItems = Array.from({ length: 20 }, (value, index) => index + 1);

export default function InventoryQuantityPicker({
  name,
  price,
  onAdd,
  disabled = false,
}: InventoryQuantityPickerProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const subtotal = price * quantity;
  const formattedSubtotal = currencyFormatter.format(subtotal);

  const styles = StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: Palette.BRIM_BACKGROUND_COLOR,
      borderTopColor: Palette.BRIM_BORDER_COLOR,
      borderTopWidth: 1,
      justifyContent: "flex-end",
    },
    top: {
      marginBottom: 4,
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    name: {
      fontWeight: 700,
      fontSize: 20,
      marginBottom: 4,
    },
    picker: {
      maxWidth: 50,
    },
    addButton: {
      fontWeight: 700,
      backgroundColor: Palette.ACCENT_COLOR,
      color: Palette.BUTTON_FOREGROUND_COLOR,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    subTotal: {
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name ?? ""}</Text>
      <View style={styles.top}>
        <Picker
          selectedValue={quantity}
          onValueChange={(_itemValue, itemIndex) =>
            setQuantity(pickerItems[itemIndex])
          }
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
      </View>
      <View style={styles.bottom}>
        <Text style={styles.subTotal}>Subtotal: {formattedSubtotal}</Text>
        <Pressable disabled={disabled} onPress={() => onAdd(quantity)}>
          <Text style={styles.addButton}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}
