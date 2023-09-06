import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useReducer,
  useState,
} from "react";
export enum FilterType {
  ADDITIVE = "additive",
  SUBTRACTIVE = "subtractive",
}
// A single value stored in FilterChip State containing the column filtered
// and the value added or removed as a filter
interface FilterChipValue {
  label: string;
  column: string;
  type: FilterType;
}
// Arrays of values to be rendered as filter chips.
type FilterChipState = FilterChipValue[];
// Available state modification actions
export enum FilterChipActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
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
  switch (action.type) {
    case FilterChipActionType.ADD:
      // Add FilterChipValue to state array to render
      return [...state, action.payload];
    case FilterChipActionType.REMOVE:
      // Remove FilterChipValue from state to remove rendered chip
      return state.filter((chipValue) => chipValue !== action.payload);
    // Default action simply for safety
    default:
      return state;
  }
};
// Creation of context with default empty arrays (i.e. no filters applied)
const FilterChipContext = createContext<{
  dispatch?: Dispatch<FilterChipAction>;
  state: FilterChipState;
}>({
  dispatch: undefined,
  state: [],
});
// Provider that wraps any components that need access to this state/update
// logic.
export const FilterChipProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(chipReducer, []);
  return (
    <FilterChipContext.Provider value={{ dispatch, state }}>
      {children}
    </FilterChipContext.Provider>
  );
};
