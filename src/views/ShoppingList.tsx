import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";
import ShoppingListItem from "../components/ShoppingListItem";
import { Palette } from "../constants";
import { currencyFormatter } from "../utils";
import { ShoppingListQuery as ShoppingListQueryType } from "./__generated__/ShoppingListQuery.graphql";

const ShoppingListQuery = graphql`
  query ShoppingListQuery {
    shoppingItems {
      id
      totalPrice
      ...ShoppingListItemFragment
    }
  }
`;

const ShoppingListDeleteItemFromShoppingListMutation = graphql`
  mutation ShoppingListDeleteItemFromShoppingListMutation(
    $shoppingItemID: ID!
  ) {
    deleteItemFromShoppingList(shoppingItemID: $shoppingItemID)
  }
`;

const ShoppingListUpdateItemFromShoppingListMutation = graphql`
  mutation ShoppingListUpdateItemFromShoppingListMutation(
    $shoppingItemID: ID!
    $quantity: Int!
  ) {
    updateItemFromShoppingList(
      shoppingItemID: $shoppingItemID
      quantity: $quantity
    ) {
      id
      quantity
      totalPrice
      inventoryItem {
        id
        name
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontWeight: 700,
  },
  addButton: {
    fontWeight: 700,
    backgroundColor: Palette.ACCENT_COLOR,
    color: Palette.BUTTON_FOREGROUND_COLOR,
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    borderRadius: 4,
  },
  listContentContainer: {
    paddingBottom: 20,
    alignItems: "center",
    gap: 12,
  },
});

export default function ShoppingList() {
  const data = useLazyLoadQuery<ShoppingListQueryType>(ShoppingListQuery, {});
  const [commitUpdateMutation, isUpdateMutationInFlight] = useMutation(
    ShoppingListUpdateItemFromShoppingListMutation
  );

  const [commitDeleteMutation, isDeleteMutationInFlight] = useMutation(
    ShoppingListDeleteItemFromShoppingListMutation
  );

  const { shoppingItems } = data;

  if (!shoppingItems) {
    return (
      <View>
        <Text>No Shopping Items could be loaded</Text>
      </View>
    );
  }

  const totalPrice: number = shoppingItems.reduce(
    (lastValue, current) => lastValue + (current.totalPrice ?? 0),
    0
  );

  const formattedTotalPrice = currencyFormatter.format(totalPrice);

  function onDelete(id: string) {
    commitDeleteMutation({
      variables: {
        shoppingItemID: id,
      },
    });
  }

  function onUpdate(id: string, quantity: number) {
    commitUpdateMutation({
      variables: {
        shoppingItemID: id,
        quantity: quantity,
      },
    });
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.top}>
        <Text style={styles.totalPrice}>
          Total Price: {formattedTotalPrice}
        </Text>
        <Pressable>
          <Link style={styles.addButton} href="/Catalogue">
            Add
          </Link>
        </Pressable>
      </View>

      <FlatList
        data={shoppingItems}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={<Text>Press the {"Add"} button to add an item to the list</Text>}
        renderItem={({ item: shoppingItem }) => (
          <ShoppingListItem
            key={shoppingItem.id}
            item={shoppingItem}
            onDelete={() => onDelete(shoppingItem.id)}
            deleteButtonIsDisabled={isDeleteMutationInFlight}
            pickerIsDisabled={isUpdateMutationInFlight}
            onUpdate={(newQuantity) => onUpdate(shoppingItem.id, newQuantity)}
          />
        )}
      />
    </View>
  );
}
