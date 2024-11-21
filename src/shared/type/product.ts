import { type TCartGiftItem, type ICartOrderItem } from '@/widgets/cart-widget/config';

export interface IGetCatalogResponse {
  code?: number;
  message?: string;
  error?: boolean;
  isReload?: 0 | 1;
  OrgID?: string;
  messagePopUp?: string;
  additions: any;
  additionsTable: any;
  categories: any;
  cutlery: any;
  gift: TCartGiftItem[];
  plates: ICartOrderItem[];
  isHit: ICartOrderItem[];
  potentialRecomendations: any;
  storiesBundles: IStoriesBundle[];
  banners: IBanner[];
  bannersAll: IBanner[];
  tagsInfo: Record<number, ITag>;
}

export interface ITag {
  id: string;
  tagType: string;
  title: string;
  title_color: string;
  posX: string;
  posY: string;
  url: string;
  widthThumbnail: string;
  heightThumbnail: string;
  heightThumbnailAdaptive: string;
  widthThumbnailAdaptive: string;
  width: string;
  height: string;
  widthAdaptive: string;
  heightAdaptive: string;
}
export interface IBanner {
  height: string;
  picture: string;
  type: string;
  url: string;
  width: string;
}

export interface IGetCategoryResponse {
  ID: string;
  Name: string;
  PictureUrl: string | null;
}

export interface IPlates {
  IsPartPizza: number;
  allergenes: any[];
  calories: number;
  carbohydrates: number;
  categoryID: number;
  composition: string;
  countInCart: number;
  fats: number;
  id: number;
  isHit: number;
  isNew: number;
  isSeason: number;
  isSpicy: number;
  isSubCategory: number;
  is_only_for_stories: number;
  itemOrder: number;
  maxCount: number;
  modifierBundles: any;
  name: string;
  parentID: number;
  pictures: string[];
  proteins: number;
  recomendations: any[];
  sizes: any[];
  thumbnailPicture: string;
  values: any[];
}

export interface IStoriesBundle {
  allowedDeliveryTypes: string;
  buttonAction: string;
  buttonActionItemID: string;
  buttonText: string;
  buttonTypeAction: string;
  categoryList: string;
  disabled: string;
  hiddenInOrganisations: string;
  hideInApp: string;
  id: string;
  isSeen: boolean;
  itemOrder: string;
  lastFrame: string;
  namePreview: string;
  pictureThumbnail: string;
  stories: IStories[];
  textBundle: string;
  titleTextBundle: string;
}

interface IStories {
  bundleID: string;
  disabled: string;
  id: string;
  itemOrder: string;
  options: string;
  picture: string;
  pictureThumbnail: string;
}

export interface IGetAllStoriesResponse {
  stories: IAllStoriesItem[];
  supportLink: string;
}

interface IAllStoriesItem {
  buttonAction: string;
  buttonActionItemID: string;
  buttonText: string;
  buttonTypeAction: string;
  id: string;
  isSeen: boolean;
  itemOrder: string;
  pictureThumbnail: string;
  stories: IStoriesItem[];
}

export interface IStoriesItem {
  BundleID: string;
  id: string;
  picture: string;
  pictureThumbnail: string;
}
