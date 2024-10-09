

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

//for adding first half of World Structure
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

 
  //for adding a World Component
  const [creationCommand, setCreationCommand] = useState("");
  const [worldStructure, setWorldStructure] = useState([]);
  const [worldComponent, setWorldComponent] = useState([]);
  const [worldComponents, setWorldComponents] = useState({});
  const [newComponents, setNewComponents] = useState([]);

  //for adding World Component elements
  const [worldComponentName, setWorldComponentName] = useState('');
  const [worldComponentType, setWorldComponentType] = useState('');
  const [worldComponentLevel, setWorldComponentLevel] = useState(0);
  const [worldComponentDescription, setWorldComponentDescription] = useState('');
  const [worldComponentImage, setWorldComponentImage] = useState('');
  const [isParent, setIsParent] = useState(false);
  
  const [nestedWorldComponents, setNestedWorldComponents] = useState([]);

  
 const determineComponentLevel = (level) =>{
    return WORLD_COMPONENTS.findIndex(type => type === level) + 1;
 }

  const submitWorldStructure = (e, worldStructure) => {
    e.preventDefault();
    
    return worldStructure;
  }


  const handleCreateWorldStructure = async (e, creationCommand) => {
  e.preventDefault();
  setCreationCommand(creationCommand);
  console.log(creationCommand);
  if(creationCommand==="new world component"){
    console.log("Passed through new world component command");
    addNewComponent(e);
  } 
    if(creationCommand==="new nested world component"){
      console.log("Passed through new nested world component command");
      addNewNestedComponent(e);
    }
    else{
      console.log("Invalid world component creation command");
      
    }
  }



  const addNewComponent = async (e, index) => {
    e.preventDefault();

    worldComponent = {
      worldComponentName,
      worldComponentType,
      worldComponentLevel,
      worldComponentDescription,
      worldComponentImage,
      isParent,
      nestedWorldComponents
    }
    setNewComponents([...newComponents, worldComponent]);

    
  }

  const addNewNestedComponent = async (e, index) => {
    e.preventDefault();

    nestedWorldComponents = {
      worldComponentName,
      worldComponentType,
      worldComponentLevel,
      worldComponentDescription,
      worldComponentImage,
      nestedWorldComponents
    }
    setNewComponents([...newComponents, nestedWorldComponents]);
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
              {/* This is the form for adding new world components. It will appear on the second page of the world creation form. */}
              <pre>
                <pre>
                  {/* This is the current state of the world structure, which is a nested array of world components. The outer array is the first level of the world structure, and each item in the array is a world component. The world component object contains the following properties:

                        - worldComponentId: a unique identifier for the world component
                        - worldComponentName: the name of the world component
                        - worldComponentType: the type of the world component (e.g. realm, region, sector, etc.)
                        - worldComponentDescription: a brief description of the world component
                        - worldComponentImage: an optional image associated with the world component
                        - childWorldComponent: an array of world components that are children of the current world component
                  */}
                  {JSON.stringify({worldStructure: worldComponent}, null, 2)}
                </pre>
              </pre>
              <h1 className="text-xl text-gray-800 mb-4">World Components</h1>

              {/* This is the button that allows users to add a new world component. It will trigger the addNewComponent function when clicked. */}
              <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" id = 'addNewComponentButton' onClick={(e)=>addNewComponent(e)}>Add World Component</button>
              <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" id = 'addWorldComponentButton' 
              onClick={(e)=>handleCreateWorldStructure(e, "new world component")}>ADC</button>

              {/* This maps over the newComponents array and renders a form for each component. The form includes fields for the component name, type, description, and image. */}
              {worldComponent.map((component, index) => (
                <div key={index} id = {'newComponentForm-${index}'}>
                  {/* This is the header for the component form. It displays the name of the component. */}
                  <h1 className="text-xl text-gray-800 mb-4">World Component '{component.name}'</h1>

                  {/* This is the field for the component name. It will update the component.name property when changed. */}
                  <InputField label="World Component Name" id="worldComponentName" type="text" value={component.name} onChange={(value) => handleComponentChange(index, 'worldComponentName', value)} />

                  {/* This is the select field for the component type. It will update the component.type property when changed. */}
                  <SelectField 
                    label="World Component Type" 
                    id="worldComponentType" 
                    value={component.type} 
                    onChange={(worldComponentType) => handleComponentChange(index, 'worldComponentType', worldComponentType, )} 
                    options={WORLD_COMPONENTS} />

                  {/* This is the text area field for the component description. It will update the component.description property when changed. */}
                  <TextAreaField label="World Component Description" id="worldComponentDescription" value={component.description} onChange={(value) => handleComponentChange(index, 'worldComponentDescription', value)} />

                  {/* This is the field for the component image. It will update the component.image property when changed. */}
                  <InputField label="World Component Image" id="worldComponentImage" type="text" value={component.image} onChange={(value) => handleComponentChange(index, 'worldComponentImage', value)} />

                  {/* This is the button that allows users to delete the world component. It will trigger the removeComponent function when clicked. */}
                  <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => removeComponent(e,index)}>Delete World Component '{component.name}'</button>

                  <button className = "bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleCheckWorldComponent(e,component)}>Check World Component</button>

                  {/* This is the button that allows users to nest a new world component. It will trigger the handleAttachNewComponent function when clicked. */}
                  <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleAttachNewComponent(e, index, newComponents)}>Old Button</button>
                  <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleNestNewComponent(e, index, newComponents)}>New Button</button>

                  {/* This maps over the component.attachedWorldComponent array and renders a form for each component. The form includes fields for the component name. */}
                  {component.attachedWorldComponent.map((component, index2) => (
                    <div key={index2} id = {'attachNewComponentForm-${index2}'}>
                      {/* This is the header for the component form. It displays the name of the component. */}
                      <h1 className="text-xl text-gray-800 mb-4">Nested World Component '{component.name}'</h1>

                      {/* This is the field for the component name. It will update the component.name property when changed. */}
                      <div>
                        <InputField label="Attached World Component Name" id="attachedWorldComponentName" type="text" value={component.name} onChange={(value) => handleComponentChange(index2, 'worldComponentName', value)} />
                        <SelectField
                          label="Attached World Component Type"
                          id="attachedWorldComponentType"
                          value={component.type}
                          onChange={(worldComponentType) => handleComponentChange(index2, 'worldComponentType', worldComponentType)}
                          options={WORLD_COMPONENTS}
                        />
                        <TextAreaField label="Attached World Component Description" id="attachedWorldComponentDescription" value={component.description} onChange={(value) => handleComponentChange(index2, 'worldComponentDescription', value)} />
                        <InputField label="Attached World Component Image" id="attachedWorldComponentImage" type="text" value={component.image} onChange={(value) => handleComponentChange(index2, 'worldComponentImage', value)} />

                        {/* This is the button that allows users to delete the attached world component. It will trigger the removeAttachedComponent function when clicked. */}
                        <button
                          className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                          onClick={(e) => removeComponent(e, index2)}
                        >
                          Delete World Component
                        </button>
                      </div>
                    
                    </div>
                  ))}
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
