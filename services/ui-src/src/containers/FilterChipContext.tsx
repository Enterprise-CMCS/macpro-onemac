import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  LOCAL_STORAGE_FILTER_CHIP_STATE_SPA,
  LOCAL_STORAGE_FILTER_CHIP_STATE_WAIVER,
} from "../utils/StorageKeys";

export enum FilterType {
  CHECKBOX,
  DATE,
  MULTISELECT,
}
export type TerritoryFilter = { value: string; label: string };
export interface FilterChipValue {
  label?: string | string[] | TerritoryFilter[];
  column?: string;
  type?: FilterType;
}
type FilterChipState = FilterChipValue[];

export enum FilterChipActionType {
  ADD,
  REMOVE,
  RESET,
  LOAD_SAVE_STATE,
}

interface FilterChipAction {
  type: FilterChipActionType;
  payload: FilterChipValue;
}
type ChipStateReducer = (
  state: FilterChipState,
  action: FilterChipAction
) => FilterChipState;

const chipReducer: ChipStateReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FilterChipActionType.ADD:
      if (payload.type === FilterType.CHECKBOX) {
        return [...state, payload];
      } else if (payload.type === FilterType.MULTISELECT) {
        // Parses through the TerritoryFilter[] and creates a single chip
        // for each.
        const multiselectValues: FilterChipValue[] = (
          payload.label as TerritoryFilter[]
        ).map((f) => ({
          label: f.value,
          column: payload.column,
          type: payload.type,
        }));
        return [
          ...state.filter((v) => v.column !== payload.column),
          ...multiselectValues,
        ];
      } else {
        // Dates use an array of values for a single column and ONLY ONE range
        // can be set at a time.
        return [...state.filter((v) => v.column !== payload.column), payload];
      }
    case FilterChipActionType.REMOVE:
      if (
        payload.type === FilterType.CHECKBOX ||
        payload.type === FilterType.MULTISELECT
      ) {
        return state.filter((v) => v.label !== payload.label);
      } else {
        // Dates use an array of values for a single filter chip,
        // so we simply filter out that chip by column id
        return state.filter((v) => v.column !== payload.column);
      }
    case FilterChipActionType.RESET:
      return [];
    case FilterChipActionType.LOAD_SAVE_STATE:
      return [...state, payload];
    default:
      return state;
  }
};

const FilterChipContext = createContext<{
  dispatch: Dispatch<FilterChipAction>;
  state: FilterChipState;
}>({
  dispatch: (v) => {},
  state: [],
});

export const FilterChipProvider = ({
  children,
  tab,
}: PropsWithChildren<{ tab: "spa" | "waiver" }>) => {
  const chipStateSaveKey = useMemo(
    () =>
      tab === "spa"
        ? LOCAL_STORAGE_FILTER_CHIP_STATE_SPA
        : LOCAL_STORAGE_FILTER_CHIP_STATE_WAIVER,
    [tab]
  );
  const chipStateFromSave: FilterChipState = useMemo(() => {
    const savedState = localStorage?.getItem(chipStateSaveKey);
    return savedState
      ? (JSON.parse(savedState) as FilterChipState)
      : ([] as FilterChipState);
  }, [chipStateSaveKey]);
  const [state, dispatch] = useReducer(chipReducer, chipStateFromSave);
  // For loading filter chip UI from saved filter state on a page refresh
  // or tab change.
  useEffect(() => {
    localStorage.setItem(chipStateSaveKey, JSON.stringify(state));
    console.log("Set state in storage.");
  }, [chipStateSaveKey, state]);
  return (
    <FilterChipContext.Provider value={{ dispatch, state }}>
      {children}
    </FilterChipContext.Provider>
  );
};

export const useFilterChipContext = () => useContext(FilterChipContext);
