

import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorldsContext } from '../hooks/useWorldContext'; // Assume this hook exists

//imported custom fields
import InputField from '../components/inputfieldform';
import ImageUploadField from '../components/imageuploadfieldform';
import MultiInputField from '../components/multipleinputfieldform';
import SelectField from '../components/selectfieldform';
import TextAreaField from '../components/textareafieldform';


//import world vars
import {NARRATIVE_PERSPECTIVES, WORLD_ROLEPLAY_STYLES, WORLD_GENRES, WORLD_COMPONENTS} from '../components/worldvars';



const CreateWorld = () => {
  const {user} = useAuthContext();
  const {dispatch} = useWorldsContext();


  const [worldName, setWorldName] = useState('');
  const [worldImage, setWorldImage] = useState('');
  const [worldDescription, setWorldDescription] = useState('');
  const [worldGenre, setWorldGenre] = useState('');
  const [worldSetting, setWorldSetting] = useState('');
  const [worldTags, setWorldTags] = useState([]);
  const [worldRoleplayStyle, setWorldRoleplayStyle] = useState('');
  const [worldPOV, setWorldPOV] = useState('');
  const [worldCreator, setWorldCreator] = useState('')

  

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);



  const [level, setLevel] = useState(0);
  const [isParent, setIsParent] = useState(false);
    
  const [worldStructure, setWorldStructure] = useState([]);

  //for adding a World Component
  const [worldComponentName, setWorldComponentName] = useState('');
  const [worldComponentType, setWorldComponentType] = useState('');
  const [worldComponentDescription, setWorldComponentDescription] = useState('');
  const [worldComponentImage, setWorldComponentImage] = useState('');



  //for adding new World Components
  const [newComponents, setNewComponents] = useState([]);
  
  //for attaching World Components
  const [attachNewComponent, setAttachNewComponent] = useState([]);

  

  
  
 
  const handleLevelChange = (e) => {
    if (e && e.target && e.target.value) {
      const selectedLevel = WORLD_COMPONENTS.findIndex(type => type === e.target.value);
      setLevel(selectedLevel);
      setIsParent(selectedLevel > 0); // Set isParent to true if the selected level is greater than 0
    }
  };
  
  const handleParentChange = (e) => {
      setIsParent(e.target.checked);
  };

  const submitWorldStructure = (e, worldStructure) => {
    e.preventDefault();
    
    return worldStructure;
  }

  const addNewComponent = async (e) => {
    e.preventDefault();
    console.log('addNewComponent called');
    setNewComponents([...newComponents, {
      worldComponentName: worldComponentName,
      worldComponentType: worldComponentType,
      worldComponentDescription: worldComponentDescription,
      worldComponentImage: worldComponentImage,
      attachedWorldComponent: []

      
    }]);

  }

  const handleComponentChange = (index, field, value) => {
    setNewComponents(newComponents.map((component, i) => {
      if (i === index) {
        return {...component, [field]: value};
    }
      return component;
    }));
  }

  const removeComponent = async (e, index) => {
    e.preventDefault();
    setNewComponents(newComponents.filter((component, i) => i !== index));
  }

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const world = {
      worldName,
      worldImage,
      worldDescription,
      worldGenre,
      worldSetting,
      worldTags,
      worldRoleplayStyle,
      worldPOV,
      worldCreator
    }
    const response = await fetch('/api/worlds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(world)
    });
    const data = await response.json();
    console.log(data);
    if(!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if(response.ok) {
      setCurrentStep(currentStep + 1);
      setError(null);
      setEmptyFields([]);
      setWorldName('');
      setWorldImage('');
      setWorldDescription('');
      setWorldGenre('');
      setWorldSetting('');
      setWorldTags([]);
      setWorldRoleplayStyle('');
      setWorldPOV('');
      setWorldCreator('');
      if (currentStep === 2) {
        setIsSubmitButtonVisible(true);
      }

    }
    
  }


  
  


  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 2) {
      setIsSubmitButtonVisible(true);
    }
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    setIsSubmitButtonVisible(false);
  };

  

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-4/5 mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <h2 className="text-3xl text-center text-gray-800 mb-6 font-serif">Create New World</h2>
          <p className="text-center text-gray-600 mb-8">Enter the details for your new world.</p>
          {error && <div className='text-red-500 text-center mt-4'>{error}</div>}
          {currentStep === 1 && (
            <div className="space-y-4" id="worldForm">
              
              <InputField label="World Name" id="worldName" type="text" value={worldName} 
              onChange={(worldName) => setWorldName(worldName)} 
              className={emptyFields.includes('worldName') ? 'error' : ''}/>
              <ImageUploadField label="World Image" id="worldImage" value={worldImage} 
              onChange={(worldImage) => setWorldImage(worldImage)} 
              className={emptyFields.includes('worldImage') ? 'error' : ''}/>
              <TextAreaField label="World Description" id="worldDescription" value={worldDescription} 
              onChange={(worldDescription) => setWorldDescription(worldDescription)} 
              className={emptyFields.includes('worldDescription') ? 'error' : ''}/>
              <InputField label="Creator Username" id="creatorUsername" type="text" value={worldCreator} 
              onChange={(worldCreator) => setWorldCreator(worldCreator)} 
              className={emptyFields.includes('creatorUsername') ? 'error' : ''}/>
              <SelectField label="World Genre" id="worldGenre" value={worldGenre} 
              onChange={(worldGenre) => setWorldGenre(worldGenre)} options={WORLD_GENRES} 
              className={emptyFields.includes('worldGenre') ? 'error' : ''}/>
              <TextAreaField label="World Setting" id="worldSetting" value={worldSetting} 
              onChange={(worldSetting) => setWorldSetting(worldSetting)} 
              className={emptyFields.includes('worldSetting') ? 'error' : ''}/>
              <MultiInputField label="World Tags" id="worldTags" values={worldTags} 
              onChange={(worldTags) => setWorldTags(worldTags)} 
              className={emptyFields.includes('worldTags') ? 'error' : ''}/>
              <SelectField label="Roleplay Style" id="worldRoleplayStyle" value={worldRoleplayStyle} 
              onChange={(worldRoleplayStyle) => setWorldRoleplayStyle(worldRoleplayStyle)} options={WORLD_ROLEPLAY_STYLES} 
              className={emptyFields.includes('worldRoleplayStyle') ? 'error' : ''}/>
              <SelectField label="Narrative Perspective" id="worldPOV" value={worldPOV} 
              onChange={(worldPOV) => setWorldPOV(worldPOV)} options={NARRATIVE_PERSPECTIVES} 
              className={emptyFields.includes('worldPOV') ? 'error' : ''}/>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4" id="worldComponentForm">
              <pre>
                <code>
                    {JSON.stringify({WorldStructure: newComponents}, null, 2)}
                </code>
              </pre>
            <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" id = 'addNewComponentButton' onClick={(e)=>addNewComponent(e)}>Add New World Component</button>
            {newComponents.map((component, index) => (
              <div key={index} id = {'newComponentForm-${index}'}>
              <h1 className="text-xl text-gray-800 mb-4">World Component '{component.name}'</h1>
              <InputField label="World Component Name" id="worldComponentName" type="text" value={component.name} onChange={(value) => handleComponentChange(index, 'worldComponentName', value)} />
              <SelectField 
              label="World Component Type" 
              id="worldComponentType" 
              value={component.type} 
              onChange={(worldComponentType) => handleComponentChange(index, 'worldComponentType', worldComponentType)} 
              options={WORLD_COMPONENTS} />
              <TextAreaField label="World Component Description" id="worldComponentDescription" value={component.description} onChange={(value) => handleComponentChange(index, 'worldComponentDescription', value)} />
              <InputField label="World Component Image" id="worldComponentImage" type="text" value={component.image} onChange={(value) => handleComponentChange(index, 'worldComponentImage', value)} />
              <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => removeComponent(e,index)}>Delete World Component '{component.name}'</button>
              <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => attachNewComponent(e, index)}>Attach New World Component</button>
              <div id = {'attachNewComponentForm-${index}'}>
              <h1 className="text-xl text-gray-800 mb-4">Attached World Component</h1>
              
                </div>
              </div>
            ))}
            </div>
          )}
          {isSubmitButtonVisible && (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-6 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300"
            >
              Finish World Creation
            </button>
          )}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300"
              >
                Previous
              </button>
            )}
            {currentStep < 2 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 text-lg bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )

}

export default CreateWorld;
