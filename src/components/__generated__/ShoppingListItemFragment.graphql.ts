/**
 * @generated SignedSource<<baf39d492b5c8d1556393cf70ce4a1aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShoppingListItemFragment$data = {
  readonly id: string;
  readonly inventoryItem: {
    readonly id: string;
    readonly name: string;
  };
  readonly quantity: number | null | undefined;
  readonly totalPrice: number | null | undefined;
  readonly " $fragmentType": "ShoppingListItemFragment";
};
export type ShoppingListItemFragment$key = {
  readonly " $data"?: ShoppingListItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShoppingListItemFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShoppingListItemFragment",
  "selections": [
    (v0/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalPrice",
      "storageKey": null
    }
  ],
  "type": "ShoppingItem",
  "abstractKey": null
};
})();

(node as any).hash = "8e2434f95c17d2aab66334fd06a372a1";

export default node;
