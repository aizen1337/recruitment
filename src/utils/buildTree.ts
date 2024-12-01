import { NavigationElement } from "@/types/NavigationElement";

export const buildTree = (elements: NavigationElement[]): NavigationElement[] => {
    const elementMap = new Map<string, NavigationElement>(
      elements.map((el) => [el.id, { ...el, subelements: [] }])
    );
  
    const roots: NavigationElement[] = [];
    elements.forEach((el) => {
      if (el.parentId) {
        const parent = elementMap.get(el.parentId);
        if (parent) {
          parent.subelements?.push(elementMap.get(el.id)!);
        }
      } else {
        roots.push(elementMap.get(el.id)!);
      }
    });
  
    return roots;
  };