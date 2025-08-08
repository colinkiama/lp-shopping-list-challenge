import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { graphql, GraphQLTaggedNode, PreloadedQuery, useMutation, usePreloadedQuery, UseQueryLoaderLoadQueryOptions, useSubscribeToInvalidationState } from "react-relay";
import ShoppingListItem from "../components/ShoppingListItem";
import { Palette } from "../constants";
import { currencyFormatter } from "../utils";
import { ShoppingListViewQuery$variables, ShoppingListViewQuery as ShoppingListViewQueryType } from "../views/__generated__/ShoppingListViewQuery.graphql";
import { useContext, useEffect } from "react";
import { UsedInventoryItemsContext } from "../context/UsedInventoryItemsContext";

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

interface ShoppingListProps {
    queryRef: PreloadedQuery<ShoppingListViewQueryType>,
    loadQuery: (variables: ShoppingListViewQuery$variables, options?: UseQueryLoaderLoadQueryOptions) => void,
    query: GraphQLTaggedNode
};

export default function ShoppingList({queryRef, loadQuery, query}: ShoppingListProps) {
  const shoppingListQueryRef = queryRef as PreloadedQuery<ShoppingListViewQueryType>

  const data = usePreloadedQuery<ShoppingListViewQueryType>(query, shoppingListQueryRef);

  const [commitUpdateMutation, isUpdateMutationInFlight] = useMutation(
    ShoppingListUpdateItemFromShoppingListMutation
  );

  const [commitDeleteMutation, isDeleteMutationInFlight] = useMutation(
    ShoppingListDeleteItemFromShoppingListMutation
  );

  const { shoppingItems } = data;
  const { updateUsedItemIds, usedItemIds } = useContext(UsedInventoryItemsContext);
  
  
  useSubscribeToInvalidationState(shoppingItems?.map(item => item.id) ?? [], () => {
    loadQuery({}, {
      fetchPolicy: 'store-and-network',
    });
  });
  
  useEffect(() => {
    const inventoryItemIds = shoppingItems?.map(item => item.inventoryItem.id) ?? [];
    const areUsedIdsUpToDate = inventoryItemIds.length === usedItemIds.length && inventoryItemIds.every((item, index) => item === usedItemIds[index]);
    if (!areUsedIdsUpToDate) {
      updateUsedItemIds(inventoryItemIds);
    }
  }, [shoppingItems, updateUsedItemIds, usedItemIds])

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
      updater: (store) => {
        const item = store.get(id);
        if (item) {
          item.invalidateRecord();
        }
      }
    });
  }

  function onUpdate(id: string, quantity: number) {
    commitUpdateMutation({
      variables: {
        shoppingItemID: id,
        quantity: quantity,
      }
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
          <Link style={styles.addButton} href="/Inventory">
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
