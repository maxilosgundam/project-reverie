const {World, WorldComponent} = require('../models/worldModel')
const mongoose = require('mongoose');
const User = require('../models/userModel');


const createWorld = async (req, res) => {
    
        const { worldName, 
            worldImage, 
            worldDescription, 
            worldGenre, 
            worldSetting, 
            worldTags, 
            worldRoleplayStyle, 
            worldPOV, 
            worldCreator
        } = req.body;

        let emptyFields = [];

        if (!worldName) emptyFields.push('worldName');
        if (!worldImage) emptyFields.push('worldImage');
        if (!worldDescription) emptyFields.push('worldDescription');
        if (!worldGenre) emptyFields.push('worldGenre');
        if (!worldSetting) emptyFields.push('worldSetting');
        if (!worldTags) emptyFields.push('worldTags');
        if (!worldRoleplayStyle) emptyFields.push('worldRoleplayStyle');
        if (!worldPOV) emptyFields.push('worldPOV');
        if (!worldCreator) emptyFields.push('worldCreator');

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields });
        }

        console.log('Received world data:', req.body);  // <-- Log the received request body
        try {
        //add world to db
        //const world_id = req.user._id;
        const world = await World.create({
            worldName,
            worldImage,
            worldDescription,
            worldGenre,
            worldSetting,
            worldTags,
            worldRoleplayStyle,
            worldPOV,
            worldCreator
            //world_id
        });

        
        // Log before saving world
        console.log('World before save:', world);  // <-- Log the world object before saving
        res.status(200).json(world);
        console.log('World has been created.');
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const createWorldComponent = async (req, res) => {
    try {
        const { worldComponentName, 
            worldComponentType, 
            worldComponentDescription, 
            worldComponentImage, 
            parentWorldComponent, 
            childWorldComponent, 
            isPrivate } = req.body;
        console.log('Received world component data:', req.body);  // <-- Log the received request body
        const worldComponent = new WorldComponent({
            worldComponentName,
            worldComponentType,
            worldComponentDescription,
            worldComponentImage,
            parentWorldComponent,
            childWorldComponent,
            isPrivate
        });

        await worldComponent.save();
        res.status(201).json(worldComponent);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {createWorld, createWorldComponent };
