import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Library to scramble (hash) passwords

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // RBAC: Defines if the user is a customer, seller, or admin [6]
  role: { 
    type: String, 
    enum: ['customer', 'seller', 'admin'], 
    default: 'customer' 
  }
}, { timestamps: true }); // Automatically adds "created at" and "updated at"

// SECURITY: Scrambles the password before saving it to the database [5]
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;