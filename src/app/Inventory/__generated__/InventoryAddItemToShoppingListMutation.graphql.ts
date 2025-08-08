/**
 * @generated SignedSource<<4ac3d305b35601e400804179dbf9985b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type InventoryAddItemToShoppingListMutation$variables = {
  inventoryItemID: string;
  quantity: number;
};
export type InventoryAddItemToShoppingListMutation$data = {
  readonly addItemToShoppingList: {
    readonly id: string;
    readonly inventoryItem: {
      readonly id: string;
      readonly name: string;
    };
    readonly quantity: number | null | undefined;
    readonly totalPrice: number | null | undefined;
  } | null | undefined;
};
export type InventoryAddItemToShoppingListMutation = {
  response: InventoryAddItemToShoppingListMutation$data;
  variables: InventoryAddItemToShoppingListMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inventoryItemID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "quantity"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "inventoryItemID",
        "variableName": "inventoryItemID"
      },
      {
        "kind": "Variable",
        "name": "quantity",
        "variableName": "quantity"
      }
    ],
    "concreteType": "ShoppingItem",
    "kind": "LinkedField",
    "name": "addItemToShoppingList",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
          (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InventoryAddItemToShoppingListMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InventoryAddItemToShoppingListMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "21b8a807e15b6d28991f5aebc24fd149",
    "id": null,
    "metadata": {},
    "name": "InventoryAddItemToShoppingListMutation",
    "operationKind": "mutation",
    "text": "mutation InventoryAddItemToShoppingListMutation(\n  $inventoryItemID: ID!\n  $quantity: Int!\n) {\n  addItemToShoppingList(inventoryItemID: $inventoryItemID, quantity: $quantity) {\n    id\n    quantity\n    totalPrice\n    inventoryItem {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "eaee085c0b217d7ce9d1034ce485f329";

export default node;
