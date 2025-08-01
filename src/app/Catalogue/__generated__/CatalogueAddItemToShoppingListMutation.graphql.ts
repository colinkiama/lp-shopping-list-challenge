/**
 * @generated SignedSource<<f5d79a69b108b0821e4d6dd556d1121d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CatalogueAddItemToShoppingListMutation$variables = {
  inventoryItemID: string;
  quantity: number;
};
export type CatalogueAddItemToShoppingListMutation$data = {
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
export type CatalogueAddItemToShoppingListMutation = {
  response: CatalogueAddItemToShoppingListMutation$data;
  variables: CatalogueAddItemToShoppingListMutation$variables;
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
    "name": "CatalogueAddItemToShoppingListMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CatalogueAddItemToShoppingListMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "4ecb5907d58c4c90c6b3f75b877505e4",
    "id": null,
    "metadata": {},
    "name": "CatalogueAddItemToShoppingListMutation",
    "operationKind": "mutation",
    "text": "mutation CatalogueAddItemToShoppingListMutation(\n  $inventoryItemID: ID!\n  $quantity: Int!\n) {\n  addItemToShoppingList(inventoryItemID: $inventoryItemID, quantity: $quantity) {\n    id\n    quantity\n    totalPrice\n    inventoryItem {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "725adc2fc1fa062bcb47fae8d9ef2f35";

export default node;
