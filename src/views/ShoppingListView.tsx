import { ActivityIndicator, StyleSheet } from "react-native";
import {
  graphql,
  useQueryLoader,
} from "react-relay";
import { ShoppingListViewQuery as ShoppingListViewQueryType } from "./__generated__/ShoppingListViewQuery.graphql";
import { Suspense, useEffect } from "react";
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

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
});

export default function ShoppingListView() {
  const [queryReference, loadQuery] = useQueryLoader<ShoppingListViewQueryType>(
    ShoppingListViewQuery
  );

  useEffect(() => {
    loadQuery({}, {
      fetchPolicy: 'store-and-network'
    });
  }, [loadQuery]);

  return (
    <Suspense fallback={
        <ActivityIndicator style={styles.activityIndicator}/>
    }>
      {queryReference 
        ? <ShoppingList
        queryRef={queryReference}
        loadQuery={loadQuery}
        query={ShoppingListViewQuery} 
        /> 
        : null
      }
      
    </Suspense>
  );
}
