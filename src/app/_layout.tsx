import { Stack } from "expo-router";
import { useState } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, FetchFunction, Network } from "relay-runtime";
import { UsedInventoryItemsContext } from "../context/UsedInventoryItemsContext";

const HTTP_ENDPOINT = "http://localhost:8000/";

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  });
  if (!resp.ok) {
    throw new Error("Response failed.");
  }
  return await resp.json();
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
});


export default function RootLayout() {
  const [usedItemIds, setUsedItemIds] = useState<string[]>([]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <UsedInventoryItemsContext value={{
        updateUsedItemIds: (nextUsedItemIds) => {
          setUsedItemIds(nextUsedItemIds);
        },
        usedItemIds: usedItemIds
      }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Shopping List",
            }}
          />
          <Stack.Screen
            name="Inventory/index"
            options={{
              title: "Add Item",
            }}
          />
        </Stack>
      </UsedInventoryItemsContext>
    </RelayEnvironmentProvider>
  );
}
