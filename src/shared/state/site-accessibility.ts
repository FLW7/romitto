export enum SiteAccessibility {
  OFF = 0,
  ON = 1,
}

export interface ISiteAccessibility {
  ru: {
    titile: string;
    descr: string;
    siteAccessibility: SiteAccessibility.OFF | SiteAccessibility.ON;
  };
}
