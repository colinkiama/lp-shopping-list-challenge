/**
 * @generated SignedSource<<1245c9d97a0e88683789fa2ed3ce1b7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CatalogueQuery$variables = Record<PropertyKey, never>;
export type CatalogueQuery$data = {
  readonly availableItems: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly price: number | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"CatalogueItemFragment">;
  }> | null | undefined;
};
export type CatalogueQuery = {
  response: CatalogueQuery$data;
  variables: CatalogueQuery$variables;
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
    "name": "CatalogueQuery",
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
            "name": "CatalogueItemFragment"
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
    "name": "CatalogueQuery",
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
    "cacheID": "320708ebc1f60cb718994718099f2441",
    "id": null,
    "metadata": {},
    "name": "CatalogueQuery",
    "operationKind": "query",
    "text": "query CatalogueQuery {\n  availableItems {\n    id\n    name\n    price\n    ...CatalogueItemFragment\n  }\n}\n\nfragment CatalogueItemFragment on InventoryItem {\n  category\n  id\n  name\n  price\n}\n"
  }
};
})();

(node as any).hash = "74acaf7e78993bef4150cce27ed31991";

export default node;
