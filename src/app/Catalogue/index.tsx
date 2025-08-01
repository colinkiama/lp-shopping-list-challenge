import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import CatalogueItem from "../../components/CatalogueItem";
import CatalogueQuantityPicker from "../../components/CatalogueQuantityPicker";
import { CatalogueQuery as CatalogueQueryType } from "./__generated__/CatalogueQuery.graphql";

const CatalogueQuery = graphql`
  query CatalogueQuery {
    availableItems {
      id
      name
      price
      ...CatalogueItemFragment
    }
  }
`;

const CatalogueAddItemToShoppingListMutation = graphql`
  mutation CatalogueAddItemToShoppingListMutation(
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
    paddingBottom: 20,
    alignItems: "center",
    gap: 12,
  },
});

export default function Catalogue() {
  const data = useLazyLoadQuery<CatalogueQueryType>(CatalogueQuery, {});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [commitMutation, isMutationInFlight] = useMutation(
    CatalogueAddItemToShoppingListMutation
  );
  const router = useRouter();

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
      onCompleted: () => {
        if (router.canGoBack()) {
          router.dismissAll();
        } else {
          router.replace('/') 
        }
      },
    });
  }

  const availableItems = data.availableItems;

  if (!availableItems) {
    return <Text>No catalogue items available!</Text>;
  }

  const selectedItem = availableItems.find((item) => item.id === selectedId);
  const selectedItemPrice = selectedItem ? selectedItem?.price ?? 0 : 0;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        data={availableItems}
        ListEmptyComponent={(<Text>No catalogue items available!</Text>)}
        renderItem={(item) => (
          <CatalogueItem
            isSelected={item.item.id === selectedId}
            key={item.item.id}
            item={item.item}
            onSelect={() => onSelect(item.item.id)}
          />
        )}
      />

      {selectedItem ? (
        <CatalogueQuantityPicker
          price={selectedItemPrice}
          name={selectedItem?.name ?? ""}
          onAdd={onAdd}
          disabled={!selectedId || isMutationInFlight}
        />
      ) : null}
    </View>
  );
}
