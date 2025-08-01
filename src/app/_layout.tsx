import { Stack } from "expo-router";
import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, FetchFunction, Network } from "relay-runtime";

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
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Shopping List",
            }}
          />
          <Stack.Screen
            name="Catalogue/index"
            options={{
              title: "Add Item",
            }}
          />
        </Stack>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
