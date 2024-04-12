export interface Iuser {
  name: string;
  email: string;
  password: string;
}

export interface IColor {
  id: string;
  name: string;
  color: string;
}

export interface IIcon {
  id: string;
  name: string;
  symbol: string;
}
export interface ICategory {
  name: string;
  color: IColor;
  isEditable: boolean;
  icon: IIcon;
}
