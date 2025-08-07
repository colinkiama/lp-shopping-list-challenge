/**
 * @generated SignedSource<<c33ab182715e9e032a0d2fbec0131973>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShoppingListViewQuery$variables = Record<PropertyKey, never>;
export type ShoppingListViewQuery$data = {
  readonly shoppingItems: ReadonlyArray<{
    readonly id: string;
    readonly inventoryItem: {
      readonly id: string;
      readonly name: string;
    };
    readonly totalPrice: number | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ShoppingListItemFragment">;
  }> | null | undefined;
};
export type ShoppingListViewQuery = {
  response: ShoppingListViewQuery$data;
  variables: ShoppingListViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalPrice",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "InventoryItem",
  "kind": "LinkedField",
  "name": "inventoryItem",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingListViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ShoppingItem",
        "kind": "LinkedField",
        "name": "shoppingItems",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShoppingListItemFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShoppingListViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ShoppingItem",
        "kind": "LinkedField",
        "name": "shoppingItems",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "quantity",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "161305a76bd3aba7a3ce2d61d2a6b584",
    "id": null,
    "metadata": {},
    "name": "ShoppingListViewQuery",
    "operationKind": "query",
    "text": "query ShoppingListViewQuery {\n  shoppingItems {\n    id\n    totalPrice\n    inventoryItem {\n      id\n      name\n    }\n    ...ShoppingListItemFragment\n  }\n}\n\nfragment ShoppingListItemFragment on ShoppingItem {\n  id\n  inventoryItem {\n    id\n    name\n  }\n  quantity\n  totalPrice\n}\n"
  }
};
})();

(node as any).hash = "5d54517760b9ba342c8bb86dc894e698";

export default node;
