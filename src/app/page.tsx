'use client'
import MainPanel from "@/components/MainPanel/MainPanel";
import NavigationForm from "@/components/NavigationForm/NavigationForm";
import { useNavigation } from "@/hooks/useNavigation";

export default function MainPage() {
    const {navigationElements} = useNavigation()
    console.log(navigationElements)
    return (
        <main>
        <MainPanel/>
        <NavigationForm/>
        {navigationElements.map((navigationElement) => (
            <div key={navigationElement.index}>
                <h2>{navigationElement.label}</h2>
            </div>
        ))}
        </main>
    )
}
