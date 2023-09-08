import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  LOCAL_STORAGE_TABLE_FILTERS_SPA,
  LOCAL_STORAGE_TABLE_FILTERS_WAIVER,
} from "../utils/StorageKeys";

export enum FilterType {
  CHECKBOX,
  DATE,
  MULTISELECT,
}
export type TerritoryFilter = { value: string; label: string };
// A single value stored in FilterChip State containing the column filtered
// and the value added or removed as a filter
export interface FilterChipValue {
  label?: string | string[] | TerritoryFilter[];
  column?: string;
  type?: FilterType;
}
// Arrays of values to be rendered as filter chips.
type FilterChipState = FilterChipValue[];
// Available state modification actions
export enum FilterChipActionType {
  ADD,
  REMOVE,
  RESET,
}
// Action object with type of modification and payload
// to update state with.
interface FilterChipAction {
  type: FilterChipActionType;
  payload: FilterChipValue;
}
type ChipStateReducer = (
  state: FilterChipState,
  action: FilterChipAction
) => FilterChipState;
// Reducer function to handle state update logic
const chipReducer: ChipStateReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FilterChipActionType.ADD:
      if (payload.type === FilterType.CHECKBOX) {
        // Just adds the single chip value to the state array.
        return [...state, payload];
      } else if (payload.type === FilterType.MULTISELECT) {
        // Parses through the TerritoryFilter[] for just the 2-letter abbreviated
        // values and creates a single chip (i.e. FilterChipValue) for each.
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
        // can be set at a time. Removes old value and adds new value based on
        // column id in payload.
        return [...state.filter((v) => v.column !== payload.column), payload];
      }
    case FilterChipActionType.REMOVE:
      if (
        payload.type === FilterType.CHECKBOX ||
        payload.type === FilterType.MULTISELECT
      ) {
        // Payload value matches, so filters out
        return state.filter((v) => v.label !== payload.label);
      } else {
        // Dates and Multiselect uses an array of values for a single column
        // Removes value (v) based on column id in payload
        return state.filter((v) => v.column !== payload.column);
      }
    case FilterChipActionType.RESET:
      return [];
    // Default action simply for safety
    default:
      return state;
  }
};
// Creation of context with default empty arrays (i.e. no filters applied)
const FilterChipContext = createContext<{
  dispatch: Dispatch<FilterChipAction>;
  state: FilterChipState;
}>({
  dispatch: (v) => {},
  state: [],
});
// Provider that wraps any components that need access to this state/update
// logic.
export const FilterChipProvider = ({
  children,
  tab,
}: PropsWithChildren<{ tab: "spa" | "waiver" }>) => {
  const [state, dispatch] = useReducer(chipReducer, []);
  // Loading from saved state
  useEffect(() => {
    const filtersSaveKey =
      tab === "spa"
        ? LOCAL_STORAGE_TABLE_FILTERS_SPA
        : LOCAL_STORAGE_TABLE_FILTERS_WAIVER;
    const savedState = sessionStorage?.getItem(filtersSaveKey);
    if (savedState) {
    }
  }, [tab]);
  return (
    <FilterChipContext.Provider value={{ dispatch, state }}>
      {children}
    </FilterChipContext.Provider>
  );
};

export const useFilterChipContext = () => useContext(FilterChipContext);
