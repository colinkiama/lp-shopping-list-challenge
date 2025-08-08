/**
 * @generated SignedSource<<8c2824fac94f667945d6814d8c105065>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InventoryQuery$variables = Record<PropertyKey, never>;
export type InventoryQuery$data = {
  readonly availableItems: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly price: number | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"InventoryItemFragment">;
  }> | null | undefined;
};
export type InventoryQuery = {
  response: InventoryQuery$data;
  variables: InventoryQuery$variables;
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InventoryQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "InventoryItem",
        "kind": "LinkedField",
        "name": "availableItems",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InventoryItemFragment"
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
    "name": "InventoryQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "InventoryItem",
        "kind": "LinkedField",
        "name": "availableItems",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aa6fbcaab5610ba49c2786fcc5c88815",
    "id": null,
    "metadata": {},
    "name": "InventoryQuery",
    "operationKind": "query",
    "text": "query InventoryQuery {\n  availableItems {\n    id\n    name\n    price\n    ...InventoryItemFragment\n  }\n}\n\nfragment InventoryItemFragment on InventoryItem {\n  category\n  id\n  name\n  price\n}\n"
  }
};
})();

(node as any).hash = "bd2d909160b9b9ea05b36c4e8312c976";

export default node;
