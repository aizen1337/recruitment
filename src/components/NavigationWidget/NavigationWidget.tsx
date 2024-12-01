import {
    useDraggable,
    useDroppable,
  } from "@dnd-kit/core";
  import { NavigationElement } from "@/types/NavigationElement";
  import NavigationForm from "../NavigationForm/NavigationForm";
  interface NavigationWidgetProps {
    element: NavigationElement;
    onMove: (id: string, newParentId: string | null) => void;
  }
  
  export const NavigationWidget: React.FC<NavigationWidgetProps> = ({ element, onMove }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: element.id,
    });
  
    const { setNodeRef: setDroppableRef } = useDroppable({
      id: element.id,
    });
  
    return (
      <div ref={setDroppableRef}>
        <div ref={setNodeRef} {...listeners} {...attributes}>
          {element.label}
        </div>
        <NavigationForm parentId={element.parentId || undefined}/>
        {element.subelements && (
          <div>
            {element.subelements.map((sub) => (
              <NavigationWidget key={sub.id} element={sub} onMove={onMove} />
            ))}
          </div>
        )}
      </div>
    );
  };
  