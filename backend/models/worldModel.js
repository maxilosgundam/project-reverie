const mongoose = require('mongoose');

const WorldSchema = new mongoose.Schema({
  worldName: { type: String, required: true, trim: true },
  worldImage: { type: Buffer },
  worldDescription: { type: String, required: true, trim: true },
  worldGenre: { type: String, required: true, trim: true },
  worldSetting: { type: String, trim: true },
  worldTags: [{ type: String, trim: true }],
  worldRoleplayStyle: { type: String, required: true, trim: true },
  worldPOV: { type: String, required: true, trim: true },
  worldCreator: { type: String, required: true, trim: true },
  // worldComponents:
  // Private info for statistics (commented out)
  // worldRoleplayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // worldCharacters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
}, { timestamps: true });

const WorldComponentSchema = new mongoose.Schema({
  worldComponentId: { type: String, required: true, trim: true },
  worldComponentName: { type: String, required: true, trim: true },
  worldComponentType: { type: String, required: true, trim: true },
  worldComponentDescription: { type: String, required: true, trim: true },
  worldComponentImage: { type: Buffer },
  parentWorldComponent: { type: mongoose.Schema.Types.ObjectId, ref: 'WorldComponent' },
  childWorldComponent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorldComponent' }],
  isPrivate: { type: Boolean, default: false }
}, { timestamps: true });



// Indexes for frequently queried fields
WorldSchema.index({ worldName: 1 });
WorldSchema.index({ worldGenre: 1 });
WorldSchema.index({ worldTags: 1 });


module.exports = {
  World: mongoose.model('World', WorldSchema),
  
};