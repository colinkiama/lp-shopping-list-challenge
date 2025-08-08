/**
 * @generated SignedSource<<559e37a96eb83c3b1f9a8778d3a71026>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InventoryItemFragment$data = {
  readonly category: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly price: number | null | undefined;
  readonly " $fragmentType": "InventoryItemFragment";
};
export type InventoryItemFragment$key = {
  readonly " $data"?: InventoryItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"InventoryItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InventoryItemFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    }
  ],
  "type": "InventoryItem",
  "abstractKey": null
};

(node as any).hash = "7403b23cc9702f62158ca88dfc524885";

export default node;
