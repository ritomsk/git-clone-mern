import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository',
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'close'],
    default: 'open',
  }
});

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;