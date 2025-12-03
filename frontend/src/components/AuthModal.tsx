import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ open, onClose, onSuccess }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border-2 border-[#e95c2a] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#e95c2a]">
            {isSignUp ? 'Sign Up' : 'Login'} to Access Products
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <div>
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/50 border-[#e95c2a]/50 text-white"
                required={isSignUp}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-[#e95c2a]/50 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-[#e95c2a]/50 text-white"
              required
              minLength={6}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</p>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-[#e95c2a] hover:bg-[#ff6f3d] text-white font-semibold"
            disabled={loading}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
          </Button>
          
          <Button 
            type="button" 
            onClick={handleGoogleSignIn} 
            variant="outline" 
            className="w-full border-[#e95c2a]/50 text-white hover:bg-[#e95c2a]/10"
            disabled={loading}
          >
            Continue with Google
          </Button>
          
          <p className="text-center text-sm text-white/70">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#e95c2a] underline hover:text-[#ff6f3d]"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
