'use client'
import { useCallback } from "react";
import { NavigationElement, NavigationElementSchema } from "@/types/NavigationElement";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./useLocalStorage";

// Utility: Build a tree from a flat list
const buildTree = (elements: NavigationElement[]): NavigationElement[] => {
    // Map each element by its ID for quick lookup
    const elementMap = new Map<string, NavigationElement>(
      elements.map((el) => [el.id, { ...el, subelements: [] }])
    );
  
    // Array to hold top-level elements
    const roots: NavigationElement[] = [];
  
    elements.forEach((el) => {
      if (el.parentId) {
        // Find the parent and add this element as a child
        const parent = elementMap.get(el.parentId);
        if (parent) {
          parent.subelements?.push(elementMap.get(el.id)!);
        }
      } else {
        // No parentId means it's a top-level element
        roots.push(elementMap.get(el.id)!);
      }
    });
  
    return roots;
  };
  

// Hook definition
export const useNavigation = () => {
  const [navigationElements, setNavigationElements] = useLocalStorage('navigationElements',[]);

  // Add a new navigation element
  const addNavigationElement = useCallback(
    (element: Omit<NavigationElement, "id">) => {
      const newElement = { ...element, id: uuidv4() };
      const validationResult = NavigationElementSchema.safeParse(newElement);
      if (!validationResult.success) {
        console.error("Invalid navigation element:", validationResult.error.errors);
        throw new Error("Invalid navigation element");
      }
      setNavigationElements([...navigationElements, newElement]);
    },
    [navigationElements, setNavigationElements]
  );

  // Remove a navigation element and its children
  const removeNavigationElement = useCallback((id: string) => {
    setNavigationElements((prev: NavigationElement[]) => prev.filter((el: NavigationElement) => el.id !== id && el.parentId !== id));
  }, [setNavigationElements]);

  // Move an element by changing its parentId
  const moveNavigationElement = useCallback((id: string, newParentId: string | null) => {
    setNavigationElements((prev: NavigationElement[]) =>
      prev.map((el: { id: string; }) =>
        el.id === id
          ? {
              ...el,
              parentId: newParentId,
            }
          : el
      )
    );
  }, [setNavigationElements]);

  // Get the nested tree structure
  const getTree = useCallback(() => buildTree(navigationElements), [navigationElements]);

  return { navigationElements, addNavigationElement, removeNavigationElement, moveNavigationElement, getTree };
};
