"use client"
import {
    useDraggable,
    useDroppable,
  } from "@dnd-kit/core";
  import { NavigationElement } from "@/types/NavigationElement";
  interface DraggableItemProps {
    element: NavigationElement;
    onMove: (id: string, newParentId: string | null) => void;
  }
  
  const DraggableItem: React.FC<DraggableItemProps> = ({ element, onMove }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: element.id,
    });
  
    const { setNodeRef: setDroppableRef } = useDroppable({
      id: element.id,
    });
  
    return (
      <li ref={setDroppableRef}>
        <div ref={setNodeRef} {...listeners} {...attributes}>
          {element.label}
        </div>
        {element.subelements && (
          <ul>
            {element.subelements.map((sub) => (
              <DraggableItem key={sub.id} element={sub} onMove={onMove} />
            ))}
          </ul>
        )}
      </li>
    );
  };
  
  interface NavigationTreeProps {
    elements: NavigationElement[];
    onMove: (id: string, newParentId: string | null) => void;
  }
  
 export const NavigationTree: React.FC<NavigationTreeProps> = ({ elements, onMove }) => {
    return (
      <ul>
        {elements.map((el) => (
          <DraggableItem key={el.id} element={el} onMove={onMove} />
        ))}
      </ul>
    );
  };
  
 