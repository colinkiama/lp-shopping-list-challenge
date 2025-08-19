import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import InventoryItem from "../../components/InventoryItem";
import InventoryQuantityPicker from "../../components/InventoryQuantityPicker";
import { InventoryQuery as InventoryQueryType } from "./__generated__/InventoryQuery.graphql";
import { UsedInventoryItemsContext } from "../../context/UsedInventoryItemsContext";
import { FontFamily } from "../../constants";

const InventoryQuery = graphql`
  query InventoryQuery {
    availableItems {
      id
      name
      price
      ...InventoryItemFragment
    }
  }
`;

const InventoryAddItemToShoppingListMutation = graphql`
  mutation InventoryAddItemToShoppingListMutation(
    $inventoryItemID: ID!
    $quantity: Int!
  ) {
    addItemToShoppingList(
      inventoryItemID: $inventoryItemID
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

export default function Inventory() {
  const data = useLazyLoadQuery<InventoryQueryType>(
    InventoryQuery,
    {},
    { fetchPolicy: "store-and-network" }
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [commitMutation, isMutationInFlight] = useMutation(
    InventoryAddItemToShoppingListMutation
  );

  const router = useRouter();
  const { usedItemIds } = useContext(UsedInventoryItemsContext);

  const availableItems = data.availableItems;

  const filteredItems =
    availableItems?.filter((item) => !usedItemIds.includes(item.id)) ?? [];

  const selectedItem = filteredItems.find((item) => item.id === selectedId);
  const selectedItemPrice = selectedItem ? selectedItem?.price ?? 0 : 0;

  function onSelect(nextId: string) {
    setSelectedId(nextId);
  }

  function onAdd(quantity: number) {
    if (!selectedId) {
      return;
    }

    commitMutation({
      variables: {
        inventoryItemID: selectedId,
        quantity: quantity,
      },
      updater: (store) => {
        store.invalidateStore();
      },
      onCompleted: () => {
        if (router.canGoBack()) {
          router.dismissAll();
        } else {
          router.replace("/");
        }
      },
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        data={filteredItems}
        ListEmptyComponent={
          <View style={styles.emptyContentContainer}>
            <Text style={styles.emptyContentText}>
              There are no items available to add
            </Text>
          </View>
        }
        renderItem={(item) => (
          <InventoryItem
            isSelected={item.item.id === selectedId}
            key={item.item.id}
            item={item.item}
            onSelect={() => onSelect(item.item.id)}
          />
        )}
      />

      {selectedItem ? (
        <InventoryQuantityPicker
          price={selectedItemPrice}
          name={selectedItem?.name ?? ""}
          onAdd={onAdd}
          disabled={!selectedId || isMutationInFlight}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    paddingTop: 12,
    paddingBottom: 240,
    paddingHorizontal: 16,
    gap: 12,
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
    fontFamily: FontFamily.Regular,
  },
});
