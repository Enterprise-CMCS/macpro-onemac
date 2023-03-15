export const LOCAL_STORAGE_COLUMN_VISIBILITY_SPA =
  "onemac-SPA-columnHiddenSavedState";
export const LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER =
  "onemac-WAIVER-columnHiddenSavedState";
export const LOCAL_STORAGE_TABLE_FILTERS_SPA =
  "onemac-SPA-tableFiltersSavedState";
export const LOCAL_STORAGE_TABLE_FILTERS_WAIVER =
  "onemac-WAIVER-tableFiltersSavedState";

export const clearTableStateStorageKeys = () => {
  localStorage.removeItem(LOCAL_STORAGE_TABLE_FILTERS_SPA);
  localStorage.removeItem(LOCAL_STORAGE_TABLE_FILTERS_WAIVER);
  localStorage.removeItem(LOCAL_STORAGE_COLUMN_VISIBILITY_SPA);
  localStorage.removeItem(LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER);
};
