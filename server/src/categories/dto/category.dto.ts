export type CategorySO = {
  category_id: number;
  parent_cat_id?: number;
  name: string;
  notes: string;
  has_children?: boolean;
  childseries: any;
  dataset_name: string;
  ancestor_names?: string[];
};
