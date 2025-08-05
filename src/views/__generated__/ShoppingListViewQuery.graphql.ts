/**
 * @generated SignedSource<<b8ec033580af3269956dc4cf3a0aa214>>
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
          {
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
          },
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
    "cacheID": "4ffd25de9882b0d84366656b5dd69991",
    "id": null,
    "metadata": {},
    "name": "ShoppingListViewQuery",
    "operationKind": "query",
    "text": "query ShoppingListViewQuery {\n  shoppingItems {\n    id\n    totalPrice\n    ...ShoppingListItemFragment\n  }\n}\n\nfragment ShoppingListItemFragment on ShoppingItem {\n  id\n  inventoryItem {\n    id\n    name\n  }\n  quantity\n  totalPrice\n}\n"
  }
};
})();

(node as any).hash = "aa89c0f25c36fc2869da9879b2ee3546";

export default node;
