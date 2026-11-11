import mongoose from 'mongoose'

const adminActivityLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  },
  adminEmail: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: true
  },
  entityId: {
    type: String,
    default: null
  },
  details: {
    type: String,
    default: ''
  },
  ip: {
    type: String,
    default: '127.0.0.1'
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

const AdminActivityLog = mongoose.model('AdminActivityLog', adminActivityLogSchema)

export default AdminActivityLog

