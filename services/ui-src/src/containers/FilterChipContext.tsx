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
//
interface FilterChipState {
  additive: FilterChipValue[];
  subtractive: FilterChipValue[];
}
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
const chipReducer: ChipStateReducer = (state, action) => {
  switch (action.type) {
    case FilterChipActionType.ADD:
      return action.payload.type === FilterType.ADDITIVE
        ? {
            subtractive: state.subtractive,
            additive: [...state.additive, action.payload],
          }
        : {
            subtractive: [...state.subtractive, action.payload],
            additive: state.additive,
          };
    case FilterChipActionType.REMOVE:
      return action.payload.type === FilterType.ADDITIVE
        ? {
            subtractive: state.subtractive,
            additive: state.additive.filter(
              (chipValue) => chipValue === action.payload
            ),
          }
        : {
            subtractive: state.subtractive.filter(
              (chipValue) => chipValue === action.payload
            ),
            additive: state.additive,
          };
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
  state: {
    additive: [],
    subtractive: [],
  },
});
// Provider that wraps any components that need access to this state/update
// logic.
export const FilterChipProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(chipReducer, {
    additive: [],
    subtractive: [],
  });
  return (
    <FilterChipContext.Provider value={{ dispatch, state }}>
      {children}
    </FilterChipContext.Provider>
  );
};
