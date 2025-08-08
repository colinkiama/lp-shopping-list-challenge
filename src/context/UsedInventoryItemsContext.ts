import { createContext } from "react";

type UsedInventoryItemsContextType = {
  updateUsedItemIds: (list: string[]) => void;
  usedItemIds: string[];
};

export const UsedInventoryItemsContext =
  createContext<UsedInventoryItemsContextType>({
    updateUsedItemIds: () => {},
    usedItemIds: [],
  });
