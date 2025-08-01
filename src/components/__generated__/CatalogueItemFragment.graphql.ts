/**
 * @generated SignedSource<<262f727eefdf9b3ad5595bfcaa4b0ff5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CatalogueItemFragment$data = {
  readonly category: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly price: number | null | undefined;
  readonly " $fragmentType": "CatalogueItemFragment";
};
export type CatalogueItemFragment$key = {
  readonly " $data"?: CatalogueItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CatalogueItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CatalogueItemFragment",
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

(node as any).hash = "47bc70a2046fabc4f8c1deb1e557d88a";

export default node;
