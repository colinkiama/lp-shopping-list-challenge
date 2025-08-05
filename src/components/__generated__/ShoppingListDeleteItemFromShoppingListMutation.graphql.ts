/**
 * @generated SignedSource<<a02ebbe7461e04a5f8697cdd41271026>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ShoppingListDeleteItemFromShoppingListMutation$variables = {
  shoppingItemID: string;
};
export type ShoppingListDeleteItemFromShoppingListMutation$data = {
  readonly deleteItemFromShoppingList: boolean | null | undefined;
};
export type ShoppingListDeleteItemFromShoppingListMutation = {
  response: ShoppingListDeleteItemFromShoppingListMutation$data;
  variables: ShoppingListDeleteItemFromShoppingListMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "shoppingItemID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "shoppingItemID",
        "variableName": "shoppingItemID"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteItemFromShoppingList",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingListDeleteItemFromShoppingListMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShoppingListDeleteItemFromShoppingListMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "65bd2859c3ed564f0b9f7e03a617c4e5",
    "id": null,
    "metadata": {},
    "name": "ShoppingListDeleteItemFromShoppingListMutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingListDeleteItemFromShoppingListMutation(\n  $shoppingItemID: ID!\n) {\n  deleteItemFromShoppingList(shoppingItemID: $shoppingItemID)\n}\n"
  }
};
})();

(node as any).hash = "ca21b5f5756317e041e6899d5002070f";

export default node;
