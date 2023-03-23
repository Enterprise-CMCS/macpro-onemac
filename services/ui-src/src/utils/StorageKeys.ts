export const LOCAL_STORAGE_COLUMN_VISIBILITY_SPA =
  "onemac-SPA-columnHiddenSavedState";
export const LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER =
  "onemac-WAIVER-columnHiddenSavedState";
export const LOCAL_STORAGE_TABLE_FILTERS_SPA =
  "onemac-SPA-tableFiltersSavedState";
export const LOCAL_STORAGE_TABLE_FILTERS_WAIVER =
  "onemac-WAIVER-tableFiltersSavedState";

export const clearTableStateStorageKeys = () => {
  // Remove all from localStorage
  localStorage.removeItem(LOCAL_STORAGE_TABLE_FILTERS_SPA);
  localStorage.removeItem(LOCAL_STORAGE_TABLE_FILTERS_WAIVER);
  localStorage.removeItem(LOCAL_STORAGE_COLUMN_VISIBILITY_SPA);
  localStorage.removeItem(LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER);
  // Remove session on logout, too
  sessionStorage.removeItem(LOCAL_STORAGE_TABLE_FILTERS_SPA);
  sessionStorage.removeItem(LOCAL_STORAGE_TABLE_FILTERS_WAIVER);
  sessionStorage.removeItem(LOCAL_STORAGE_COLUMN_VISIBILITY_SPA);
  sessionStorage.removeItem(LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER);
};
