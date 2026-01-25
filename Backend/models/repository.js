import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: [
    {
      type: String,
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
    }
  ],
  visibility: {
    type: Boolean,
  }
});

const Repository = mongoose.model('Repository', repositorySchema);
export default Repository;