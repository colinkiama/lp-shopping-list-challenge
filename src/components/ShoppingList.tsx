import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  graphql,
  GraphQLTaggedNode,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
  UseQueryLoaderLoadQueryOptions,
  useSubscribeToInvalidationState,
} from "react-relay";

import { UsedInventoryItemsContext } from "../context/UsedInventoryItemsContext";
import ShoppingListItem from "../components/ShoppingListItem";
import { FontFamily } from "../constants";
import { currencyFormatter } from "../utils";
import {
  ShoppingListViewQuery$variables,
  ShoppingListViewQuery as ShoppingListViewQueryType,
} from "../views/__generated__/ShoppingListViewQuery.graphql";

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

interface ShoppingListProps {
  queryRef: PreloadedQuery<ShoppingListViewQueryType>;
  loadQuery: (
    variables: ShoppingListViewQuery$variables,
    options?: UseQueryLoaderLoadQueryOptions
  ) => void;
  query: GraphQLTaggedNode;
}

export default function ShoppingList({
  queryRef,
  loadQuery,
  query,
}: ShoppingListProps) {
  const shoppingListQueryRef =
    queryRef as PreloadedQuery<ShoppingListViewQueryType>;

  const data = usePreloadedQuery<ShoppingListViewQueryType>(
    query,
    shoppingListQueryRef
  );

  const [commitUpdateMutation, isUpdateMutationInFlight] = useMutation(
    ShoppingListUpdateItemFromShoppingListMutation
  );

  const [commitDeleteMutation, isDeleteMutationInFlight] = useMutation(
    ShoppingListDeleteItemFromShoppingListMutation
  );

  const { shoppingItems } = data;
  const { updateUsedItemIds, usedItemIds } = useContext(
    UsedInventoryItemsContext
  );

  useSubscribeToInvalidationState(
    shoppingItems?.map((item) => item.id) ?? [],
    () => {
      loadQuery(
        {},
        {
          fetchPolicy: "store-and-network",
        }
      );
    }
  );

  useEffect(() => {
    const inventoryItemIds =
      shoppingItems?.map((item) => item.inventoryItem.id) ?? [];
    const areUsedIdsUpToDate =
      inventoryItemIds.length === usedItemIds.length &&
      inventoryItemIds.every((item, index) => item === usedItemIds[index]);
    if (!areUsedIdsUpToDate) {
      updateUsedItemIds(inventoryItemIds);
    }
  }, [shoppingItems, updateUsedItemIds, usedItemIds]);

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
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.totalPriceLabel}>Total Price</Text>
        <Text style={styles.totalPriceValue}>{formattedTotalPrice}</Text>
      </View>

      <FlatList
        data={shoppingItems}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <View style={styles.emptyContentContainer}>
            <Text style={styles.emptyContentText}>Your shopping list is empty</Text>
            <Text style={styles.emptyContentText}>Press the &lsquo;+&rsquo; button to add an item to the list</Text>
          </View>
        }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: 4,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  totalPriceLabel: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    color: "#595959",
    letterSpacing: -1
  },
  totalPriceValue: {
    fontFamily: FontFamily.Bold,
    fontSize: 32,
    letterSpacing: -1,
  },
  listContentContainer: {
    paddingBottom: 40,
    gap: 12,
    paddingHorizontal: 16,
  },
  emptyContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContentText: {
    textAlign: "center",
    color: "#595959",
    fontSize: 16,
    fontFamily: FontFamily.Regular
  },
});
