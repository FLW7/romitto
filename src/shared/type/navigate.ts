export interface INavigateResponse {
  data: NavigateItem[];
}

export interface NavigateItem {
  id: string;
  name: string;
  url: string;
}
