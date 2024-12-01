import { NavigationWidget } from "../NavigationWidget/NavigationWidget";
import { useNavigationStore } from "@/context/NavigationStoreProvider";
interface NavigationTreeProps {
  onMove: (id: string, newParentId: string | null) => void;
}

export const NavigationTree: React.FC<NavigationTreeProps> = ({ onMove }) => {
  const {getTree} = useNavigationStore((state) => state)
  return (
    <div>
      {getTree().map((el) => (
        <NavigationWidget key={el.id} element={el} onMove={onMove} />
      ))}
    </div>
  );
};