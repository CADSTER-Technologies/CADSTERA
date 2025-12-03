import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface ProtectedProductLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ProtectedProductLink = ({ 
  to, 
  children, 
  className,
  onClick 
}: ProtectedProductLinkProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) onClick();
    
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate(to);
    }
  };

  const handleAuthSuccess = () => {
    navigate(to);
  };

  return (
    <>
      <a 
        href={to} 
        onClick={handleClick} 
        className={className}
      >
        {children}
      </a>
      
      <AuthModal 
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};
