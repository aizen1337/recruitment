"use client"
import React from "react";
import { useNavigation } from "@/hooks/useNavigation";
import {NavigationTree} from "@/components/NavigationTree/NavigationTree";
import { DndContext } from "@dnd-kit/core";
import MainPanel from "@/components/MainPanel/MainPanel";
import NavigationForm from "@/components/NavigationForm/NavigationForm";

const App: React.FC = () => {
  const { getTree, addNavigationElement, moveNavigationElement } = useNavigation();

  const handleAddTopLevel = () => {
    addNavigationElement({ label: "New Top-Level", parentId: null, url: "https://example.com" });
  };

  const handleAddChild = (parentId: string) => {
    addNavigationElement({ label: "New Child", parentId, url: "https://example.com" });
  };

  const tree = getTree(); // Use the tree structure for rendering

  return (
    <>
    <MainPanel/>
    <DndContext>
    <div>
      <button onClick={handleAddTopLevel}>Add Top-Level Element</button>
      {tree.map((topLevelElement) => (
        <div key={topLevelElement.id}>
          <h3>{topLevelElement.label}</h3>
          <NavigationForm parentId={topLevelElement.id || undefined}/>
          <button onClick={() => handleAddChild(topLevelElement.id)}>Add Child</button>
          <NavigationTree
            elements={topLevelElement.subelements || []}
            onMove={moveNavigationElement}
          />
        </div>
      ))}
    </div>
    </DndContext>
    </>
  );
};

export default App;
