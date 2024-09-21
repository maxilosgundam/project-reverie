
import { WorldsContext } from "../context/WorldContext";
import { useContext } from "react";

export const useWorldsContext = () => {
    const context = useContext(WorldsContext);
    if (!context) {
        throw Error('useWorldsContext must be used within a CreateWorldContextProvider');
    }
    return context;
}