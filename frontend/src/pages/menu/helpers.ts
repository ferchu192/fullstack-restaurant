import { MenuCardInterface } from "../../components/Cards/Menu";
import { TypeHeader } from "../../components/Tag";
import { Menu } from "./Menu"

export const parseMenu = (menus: Menu[]): MenuCardInterface[] => {
  const result = menus.map((menu, index) => {
    const headers = [];

    if (menu.isCeliac) headers.push(TypeHeader.celiac);
    if (menu.isVegan) headers.push(TypeHeader.vegan);

    return {
      title: menu.name,
      description: menu.description,
      price: menu.price,
      type: menu.type,
      image: menu.image,
      ingredients: menu.ingredients,
      isVegan: menu.isVegan,
      isCeliac: menu.isCeliac,
      headers,
      key: `menu-${index}`
    }
  });
  return result;
}