'use client'
import { useState, useCallback } from "react";
import { z } from "zod";

// Define the NavigationElement schema using zod
export type NavigationElement = {
    index: number,
    label: string,
    url?: string,
    subelements: NavigationElement[]
}

export const NavigationElementSchema: z.ZodType<NavigationElement> = z.lazy(() => 
    z.object({
    index: z.number(),
    label: z.string().min(1, "Label is required"),
    url: z.string().optional(),
    subelements: z.array(NavigationElementSchema)
    })
);



export const useNavigation = () => {
  const [navigationElements, setNavigationElements] = useState<NavigationElement[]>([]);
    const calculateNextIndex = (elements: NavigationElement[]): number => {
        if (elements.length === 0) return 0;
        return Math.max(...elements.map((el) => el.index)) + 1;
    };
    
    const normalizeIndices = (elements: NavigationElement[]): NavigationElement[] => {
        return elements
        .sort((a, b) => a.index - b.index) 
        .map((element, newIndex) => ({
            ...element,
            index: newIndex, 
        }));
    };
    const addNavigationElement = useCallback((element: Omit<NavigationElement, "index">) => {
        setNavigationElements((prev) => {
        const nextIndex = calculateNextIndex(prev);
        const newElement = { ...element, index: nextIndex };
        const validationResult = NavigationElementSchema.safeParse(newElement);
        if (!validationResult.success) {
            console.error("Invalid navigation element:", validationResult.error.errors);
            throw new Error("Invalid navigation element");
        }
        return [...prev, newElement];
        })
    },[setNavigationElements])
    const removeNavigationElement = useCallback((indexToRemove: number) => {
        setNavigationElements((prev) => {
          const filtered = prev.filter((el) => el.index !== indexToRemove);
          return normalizeIndices(filtered);
        });
      }, []);
    const getNavigationElements = useCallback(() => navigationElements, [navigationElements]);
    return { navigationElements, addNavigationElement, removeNavigationElement, getNavigationElements };
}