const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['student', 'faculty', 'admin'];

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ROLES, required: true },
    academicTrack: { type: String, default: '' },
    graduationYear: { type: String, default: '' },
    department: { type: String, default: '' },
    employeeId: { type: String, default: '' },
    accessLevel: { type: String, default: '' },
  },
  { timestamps: true },
);

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id.toString(),
    fullName: this.fullName,
    email: this.email,
    role: this.role,
    academicTrack: this.academicTrack,
    graduationYear: this.graduationYear,
    department: this.department,
    employeeId: this.employeeId,
    accessLevel: this.accessLevel,
  };
};

module.exports = mongoose.model('User', userSchema);
