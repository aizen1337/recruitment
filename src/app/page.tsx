"use client"
import React from "react";
import { useNavigationStore } from "@/context/NavigationStoreProvider";
import {NavigationTree} from "@/components/NavigationTree/NavigationTree";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import MainPanel from "@/components/MainPanel/MainPanel";

const App: React.FC = () => {
  const {moveNavigationElement} = useNavigationStore((state) => state);  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      if (active.id == over.id) {
        moveNavigationElement(String(active.id), null);
      }
      moveNavigationElement(String(active.id), String(over.id));
    } else {
      moveNavigationElement(String(active.id), null); // Move to top-level if dropped elsewhere
    }
  };

  return (
    <>
      <MainPanel/>
      <main>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <NavigationTree onMove={moveNavigationElement} />
      </DndContext>
      </main>
    </>
  );
};

export default App;
