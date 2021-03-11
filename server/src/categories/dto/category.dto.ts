export type CategorySO = {
  category_id: number;
  parent_cat_id?: number;
  name: string;
  notes: string;
  childSeries: any;
  dataset_name: string;
};
