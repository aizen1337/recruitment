import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import NavigationForm from "../NavigationForm/NavigationForm";

export default function MainPanel() {
    const [open,setOpen] = useState(false)
    return (
    <>
    <section className="
    flex flex-col items-center justify-center
    py-[24px] px-[16px]
    gap-[8px]
    w-[1168px]
    box-border
    h-[160px]
    left-[24px]
    top-[30px]
    bg-[#F9FAFB]
    rounded-[8px]
    border-1
    border-[#EAECF0]
    ">
    <main className="
    flex flex-col items-center justify-center
    p-0 
    gap-[24px]
    w-[512px]
    h-[112px]
    flex-none
    order-1
    flex-grow
    z-1
    ">
    <h1 className="
    font-bold
    ">Menu jest puste</h1>
    <h2>W tym menu nie ma jeszcze żadnych linków.</h2>
    <Button    
    className="
    bg-[#7F56D9] 
    hover:bg-[#7F56D9] 
    border-1 
    border-[#7F56D9]
    "
    onClick={() => setOpen(!open)}
    >
    <CirclePlus/> 
    Dodaj pozycję menu
    </Button>
    </main>
    </section>
    {open && <NavigationForm/>}
    </>
    )
}
/* Empty state */

// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: center;
// padding: 0px;
// gap: 24px;

// width: 512px;
// height: 112px;


// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 1;
// z-index: 1;
