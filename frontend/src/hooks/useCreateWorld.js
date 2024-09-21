import { useState } from "react";
import {useCreateWorldContext} from "./useWorldContext";
import { useAuthContext } from "./useAuthContext";


export const useCreateWorld = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useCreateWorldContext();
    const {user} = useAuthContext();

    const createWorld = async ({
        worldName,
        worldImage,
        worldDescription, 
        worldGenre, 
        worldSetting, 
        worldTags,
        worldRoleplayStyle,
        worldPOV,
        worldCreator
             }) => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/api/world/createworld', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},

                body: JSON.stringify({worldName, 
                                      worldImage, 
                                      worldDescription, 
                                      worldGenre, 
                                      worldSetting, 
                                      worldTags, 
                                      worldRoleplayStyle, 
                                      worldPOV, 
                                      worldCreator
                                    })
            });

            const json = await response.json();
            console.log('json is ', json);
            if (!response.ok) {
                setIsLoading(false);
                setError(json.message);
                
            } else {
                setError(json.message);
            }   

            if (response.ok) {
                dispatch({type: 'CREATE_WORLD', payload: json});
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setError('An error occurred during world creation');
        }
    }

    return { createWorld, isLoading, error };
}