import { Text, View } from "react-native";
import {
  graphql,
  useQueryLoader,
} from "react-relay";
import { ShoppingListViewQuery as ShoppingListViewQueryType } from "./__generated__/ShoppingListViewQuery.graphql";
import { useEffect } from "react";
import ShoppingList from "../components/ShoppingList";

const ShoppingListViewQuery = graphql`
  query ShoppingListViewQuery {
    shoppingItems {
      id
      totalPrice
      inventoryItem {
        id
        name
      }
      ...ShoppingListItemFragment
    }
  }
`;

export default function ShoppingListView() {
  const [queryReference, loadQuery] = useQueryLoader<ShoppingListViewQueryType>(
    ShoppingListViewQuery
  );

  useEffect(() => {
    loadQuery({}, {
      fetchPolicy: 'store-and-network'
    });
  }, [loadQuery]);

  if (!queryReference) {
    return (
      <View>
        <Text>Loading shopping items...</Text>
      </View>
    );
  }

  return (
    <ShoppingList
      queryRef={queryReference}
      loadQuery={loadQuery}
      query={ShoppingListViewQuery}
    />
  );
}
