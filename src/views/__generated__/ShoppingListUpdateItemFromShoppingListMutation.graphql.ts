/**
 * @generated SignedSource<<36704d57859b30b1aca46a3323de5baa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ShoppingListUpdateItemFromShoppingListMutation$variables = {
  quantity: number;
  shoppingItemID: string;
};
export type ShoppingListUpdateItemFromShoppingListMutation$data = {
  readonly updateItemFromShoppingList: {
    readonly id: string;
    readonly inventoryItem: {
      readonly id: string;
      readonly name: string;
    };
    readonly quantity: number | null | undefined;
    readonly totalPrice: number | null | undefined;
  } | null | undefined;
};
export type ShoppingListUpdateItemFromShoppingListMutation = {
  response: ShoppingListUpdateItemFromShoppingListMutation$data;
  variables: ShoppingListUpdateItemFromShoppingListMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "quantity"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "shoppingItemID"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "quantity",
        "variableName": "quantity"
      },
      {
        "kind": "Variable",
        "name": "shoppingItemID",
        "variableName": "shoppingItemID"
      }
    ],
    "concreteType": "ShoppingItem",
    "kind": "LinkedField",
    "name": "updateItemFromShoppingList",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "quantity",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "InventoryItem",
        "kind": "LinkedField",
        "name": "inventoryItem",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingListUpdateItemFromShoppingListMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ShoppingListUpdateItemFromShoppingListMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "29d69578fc568949685e7d10c5a25ec1",
    "id": null,
    "metadata": {},
    "name": "ShoppingListUpdateItemFromShoppingListMutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingListUpdateItemFromShoppingListMutation(\n  $shoppingItemID: ID!\n  $quantity: Int!\n) {\n  updateItemFromShoppingList(shoppingItemID: $shoppingItemID, quantity: $quantity) {\n    id\n    quantity\n    totalPrice\n    inventoryItem {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "831e88ee139d154a5ec12d7e6ddae499";

export default node;
