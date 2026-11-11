import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'editor', 'seo_manager'],
    default: 'admin'
  },
  permissions: {
    type: [String],
    default: ['dashboard', 'pages', 'content', 'navigation', 'media', 'users', 'inquiries', 'seo', 'settings']
  },
  avatar: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
})

// Hash password before saving
adminUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  // Prevent double-hashing if password is already a bcrypt hash
  if (typeof this.password === 'string' && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password
adminUserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const AdminUser = mongoose.model('AdminUser', adminUserSchema)

export default AdminUser
