import { Category } from './Category';

export interface Options {
  categories: Category[];
  types: {
    name: string;
    id: string;
  }[];
  difficulties: {
    name: string;
    id: string;
  }[];
  quantities: {
    name: string;
    id: string;
  }[];
}
