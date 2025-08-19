import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontFamily, Palette } from "../constants";
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
  const [isHoveringAddButton, setIsHoveringAddButton] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.name}>{name ?? ""}</Text>
        <View style={styles.top}>
          <Text style={styles.subTotal}>Subtotal: {formattedSubtotal}</Text>
        </View>
        <View style={styles.bottom}>
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

          <Pressable
            disabled={disabled}
            onPress={() => onAdd(quantity)}
            onHoverIn={() => setIsHoveringAddButton(true)}
            onHoverOut={() => setIsHoveringAddButton(false)}
          >
            <Text
              style={{
                ...styles.addButton,
                ...(isHoveringAddButton ? styles.addButtonHoveredIn : null),
              }}
            >
              Add
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  subContainer: {
    backgroundColor: Palette.BACKGROUND_COLOR,
    justifyContent: "flex-end",
    padding: 16,
    borderRadius: 12,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: "12px",
        spreadDistance: "3px",
        color: "#00000016",
      },
    ],
    borderColor: Palette.BORDER_COLOR,
    borderWidth: 1,
    maxWidth: 400,
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
    fontSize: 24,
    marginBottom: 4,
    fontFamily: FontFamily.Medium,
    letterSpacing: -2,
  },
  picker: {
    width: 50,
  },
  addButton: {
    backgroundColor: "#000000",
    color: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontFamily: FontFamily.SemiBold,
    fontSize: 16,
  },
  addButtonHoveredIn: {
    backgroundColor: "#363636ff",
    
  },
  subTotal: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: "#595959",
    letterSpacing: -1,
  },
});
