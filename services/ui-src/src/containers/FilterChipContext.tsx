import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
export enum FilterType {
  CHECKBOX,
  DATE,
  MULTISELECT,
}
// A single value stored in FilterChip State containing the column filtered
// and the value added or removed as a filter
export interface FilterChipValue {
  label?: string | string[];
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
        // Just adds value
        return [...state, payload];
      } else {
        // Dates and Multiselect uses an array of values for a single column
        // Removes old value and adds new value based on column id in payload
        return [...state.filter((v) => v.column !== payload.column), payload];
      }
    case FilterChipActionType.REMOVE:
      if (payload.type === FilterType.CHECKBOX) {
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
export const FilterChipProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(chipReducer, []);
  return (
    <FilterChipContext.Provider value={{ dispatch, state }}>
      {children}
    </FilterChipContext.Provider>
  );
};

export const useFilterChipContext = () => useContext(FilterChipContext);
