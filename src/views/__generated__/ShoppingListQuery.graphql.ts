/**
 * @generated SignedSource<<0839acff119c0e3ed781433fd3c2da2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShoppingListQuery$variables = Record<PropertyKey, never>;
export type ShoppingListQuery$data = {
  readonly shoppingItems: ReadonlyArray<{
    readonly id: string;
    readonly totalPrice: number | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ShoppingListItemFragment">;
  }> | null | undefined;
};
export type ShoppingListQuery = {
  response: ShoppingListQuery$data;
  variables: ShoppingListQuery$variables;
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
    "name": "ShoppingListQuery",
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
    "name": "ShoppingListQuery",
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
    "cacheID": "e4826bced2ecc7d6d2c8710a75b69f70",
    "id": null,
    "metadata": {},
    "name": "ShoppingListQuery",
    "operationKind": "query",
    "text": "query ShoppingListQuery {\n  shoppingItems {\n    id\n    totalPrice\n    ...ShoppingListItemFragment\n  }\n}\n\nfragment ShoppingListItemFragment on ShoppingItem {\n  id\n  inventoryItem {\n    id\n    name\n  }\n  quantity\n  totalPrice\n}\n"
  }
};
})();

(node as any).hash = "a8f231ae3e0076c1b003484fbf2f5454";

export default node;
